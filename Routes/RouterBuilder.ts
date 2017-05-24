"use strict";
import * as Router from "koa-router";
import { activator } from "../DependencyInjection/Activator";
import { routeManager } from "./RouteManager";

export class RouterBuilder {

    private _router: Router;
    private _built: boolean;

    constructor() {
        this._router = new Router();
        this._built = false;
    }

    private buildRouter() {
        if (!this._built) {
            for (let [pathInfo, routeInfo] of routeManager.routeMap) {
                let prefix: string = routeManager.getRoutePrefix(routeInfo.constructor);
                let path: string = pathInfo.path;
                if (!path.startsWith("/")) {
                    path = prefix + path;
                }

                let route: Router.IMiddleware = this.wrapAction(routeInfo.constructor, routeInfo.function);
                switch (pathInfo.method) {
                    case "GET": this._router.get(path, route); break;
                    case "POST": this._router.post(path, route); break;
                    case "PUT": this._router.put(path, route); break;
                    case "DELETE": this._router.delete(path, route); break;
                    case "OPTIONS": this._router.options(path, route); break;
                    case "ALL": this._router.all(path, route); break;
                    default: {
                        try {
                            this._router[pathInfo.method.toLowerCase()](path, route); break;
                        } catch (error) {
                            //eat the undefined error;
                        }
                    }
                }
            }
            this._built = true;
        }
    }

    public routes() {
        this.buildRouter();
        return this._router.routes();
    }

    public allowedMethods() {
        return this._router.allowedMethods();
    }

    private wrapAction(routeConstructor: FunctionConstructor, routeFunction: Function): Router.IMiddleware {
        return (ctx, next) => {
            let obj = activator.createInstance(routeConstructor);
            return routeFunction.call(obj, ctx);
        }
    }
}