"use strict";
import * as Router from "koa-router";
import {controllers} from "../Controllers";

interface RouteInfo {
    path: string,
    method: string,
    name: string
}

export class RouterBuilder {

    private _router: Router;
    private _controllerInstances: any[];
    private _built: boolean;

    constructor() {
        this._router = new Router();
        this._controllerInstances = [];
        this._built = false;
    }

    private buildRouter() {
        if (!this._built) {
            for (let e of controllers) {
                let obj: { routers: RouteInfo[] } = <any>e.prototype;
                let routePrefix = Reflect.get(e, "routePrefix")
                let prefix: string = routePrefix ? routePrefix : "/";

                if (prefix[prefix.length - 1] !== "/") {
                    prefix += "/";
                }

                for (let router of obj.routers) {
                    let path: string = router.path;

                    if (!path.startsWith("/")) {
                        path = prefix + path;
                    }
                    var route:Router.IMiddleware = this.wapperAction(e, router.name);
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

                this._controllerInstances.push(obj);
            }
        }
    }

    public routes() {
        this.buildRouter();
        return this._router.routes();
    }

    public allowedMethods() {
        return this._router.allowedMethods();
    }

    private wapperAction(controllerType:Function, name:string):Router.IMiddleware {
        return (ctx, next) => {
            var obj = Reflect.construct(controllerType, []);
            return obj[name].call(obj, ctx, next);
        }
    }
}