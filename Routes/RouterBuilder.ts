"use strict";
import * as Router from "koa-router";
import { controllers } from "../Controllers";
import { symbolRouters, symbolRoutePrefix } from "./Decorator";
import { activator } from "../DependencyInjection/Activator";

interface RouteInfo {
    path: string,
    method: string,
    name: string
}

export class RouterBuilder {

    private _router: Router;
    private _built: boolean;

    constructor() {
        this._router = new Router();
        this._built = false;
    }

    private buildRouter() {
        if (!this._built) {
            for (let e of controllers) {
                let routers: RouteInfo[] = e.prototype[symbolRouters];
                let routePrefix = Reflect.get(e, symbolRoutePrefix)
                let prefix: string = routePrefix ? routePrefix : "/";

                if (prefix[prefix.length - 1] !== "/") {
                    prefix += "/";
                }

                for (let router of routers) {
                    let path: string = router.path;

                    if (!path.startsWith("/")) {
                        path = prefix + path;
                    }
                    let route: Router.IMiddleware = this.wrapAction(e, router.name);
                    switch (router.method) {
                        case "GET": this._router.get(path, route); break;
                        case "POST": this._router.post(path, route); break;
                        case "PUT": this._router.put(path, route); break;
                        case "DELETE": this._router.delete(path, route); break;
                        case "OPTIONS": this._router.options(path, route); break;
                        case "ALL": this._router.all(path, route); break;
                        default: {
                            try {
                                this._router[router.method.toLowerCase()](path, route); break;
                            } catch (error) {
                                //eat the undefined error;
                            }
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

    private wrapAction(controllerType: Function, name: string): Router.IMiddleware {
        return (ctx, next) => {
            let obj = activator.createInstance(controllerType);
            return obj[name].call(obj, ctx, next);
        }
    }
}