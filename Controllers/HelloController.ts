"use strict";
import { GET, POST, PUT, DELETE, OPTIONS, ALL, route, routePrefix } from "../Routes/Decorator";
import { Context } from "koa";
import { injectParam, inject } from "../DependencyInjection/Decorator";

@routePrefix("/hello")
export class HelloController {
    constructor() {
        console.log("create new instance hello");
    }

    @GET("world")
    async getWorld(ctx: Context): Promise<void> {
        ctx.body = "hello world get";
    }

    @PUT("world")
    async putWorld(ctx: Context): Promise<void> {
        ctx.body = "hello world put";
    }

    @POST("world")
    async postWorld(ctx: Context): Promise<void> {
        ctx.body = "hello world post";
    }

    @DELETE("world")
    async deleteWorld(ctx: Context): Promise<void> {
        ctx.body = "hello world delete";
    }

    @OPTIONS("world")
    async optionsWorld(ctx: Context): Promise<void> {
        ctx.body = "hello world options";
    }

    @route("PATCH", "world")
    async patchWorld(ctx: Context): Promise<void> {
        ctx.body = "hello world patch";
    }

    @ALL("all/world")
    async allWorld(ctx: Context): Promise<void> {
        ctx.body = "hello world all";
    }

    @OPTIONS("test")
    @GET("test")
    @route("HEAD", "test")
    async test(ctx: Context): Promise<void> {
        let methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"];
        ctx.response.set("X-Url", "/hello/world");
        ctx.response.set("X-Support-Method", methods.join(";"));
        if (ctx.request.method == "GET") {
            ctx.body = { url: "/hello/world", method: methods }
        } else {
            ctx.body = null;
        }
    }
}