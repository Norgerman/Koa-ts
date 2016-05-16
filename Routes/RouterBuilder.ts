"use strict";
import * as Router from "koa-router";
import {controllers} from "../Controllers";

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
                let obj = Reflect.construct(e, []);
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

                    switch (router.method) {
                        case "GET": this._router.get(path, obj[router.name].bind(obj)); break;
                        case "POST": this._router.post(path, obj[router.name].bind(obj)); break;
                        case "PUT": this._router.put(path, obj[router.name].bind(obj)); break;
                        case "DELETE": this._router.delete(path, obj[router.name].bind(obj)); break;
                        case "OPTIONS": this._router.options(path, obj[router.name].bind(obj)); break;
                        case "ALL": this._router.all(path, obj[router.name].bind(obj)); break;
                        default: {
                            try {
                                this._router[router.method.toLowerCase()](path, obj[router.name].bind(obj)); break;
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
}