"use strict";
import {GET, POST, PUT, DELETE, OPTIONS, ALL, Route, RoutePrefix} from "../Routes/Decorator";
import {Context} from "koa";

@RoutePrefix("/home")
export class HomeController {
    @GET("/")
    @GET("index")
    async index(ctx: Context): Promise<void> {
        ctx.body = "hello";
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