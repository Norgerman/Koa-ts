import * as Koa from "koa";

declare module "koa" {
    interface Request {
        params: any; //koa-router
    }
}