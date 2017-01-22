import * as Koa from "koa";

declare module "koa" {
    interface Context {
        params: any; //koa-router
    }
}