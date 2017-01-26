"use strict";
import { GET, POST, PUT, DELETE, OPTIONS, ALL, route, routePrefix } from "../Routes/Decorator";
import { Context } from "koa";
import { injectParam, injectProperty } from "../DependencyInjection/Decorator";
import { A, B } from "../InjectionTest"

@routePrefix("/hello")
export class HelloController {
    @injectProperty("a1")
    v1: A;
    @injectProperty("a2")
    v2: A;
    @injectProperty("a3")
    v3: A;
    @injectProperty("a3")
    v4: A;
    @injectProperty("b")
    v5: B;

    constructor(@injectParam("a1") p1: A, @injectParam("a2") p2: A, @injectParam("a3") p3: A, @injectParam("b") p4: B) {
        console.log(p1)
        console.log(p2)
        console.log(p3)
        console.log(p4)
        console.log("create controller hello");
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
        console.log(this.v1);
        console.log(this.v2);
        console.log(this.v3);
        console.log(this.v4);
        console.log(this.v5);
    }
}