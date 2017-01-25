"use strict";
import {GET, POST, PUT, DELETE, OPTIONS, ALL, route, routePrefix} from "../Routes/Decorator";
import {Context} from "koa";

@routePrefix("/home")
export class HomeController {

    constructor() {
        console.log("create new instance home");
    }

    @GET("/")
    @GET("index")
    async index(ctx: Context): Promise<void> {
        ctx.body = {
            query: ctx.query,
            message: "hello"
        };
    }

    @POST("add")
    async add(ctx: Context): Promise<void> {
        console.log(ctx.request.body);
        ctx.body = { body: ctx.request.body };
    }

    @GET("search/:id")
    search(ctx: Context): Promise<void> {
        console.log(ctx.params);
        ctx.body = { params: ctx.params };
        return Promise.resolve();
    }
}