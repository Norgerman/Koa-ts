"use strict";

export const symbolRoutePrefix: symbol = Symbol("routePrefix");
export const symbolRouters: symbol = Symbol("routers");

export function routePrefix(prefix: string): ClassDecorator {
    return target => {
        target[symbolRoutePrefix] = prefix;
    }
}

export function route(method: string, path: string): MethodDecorator {
    return (target: any, name: string, descriptor: TypedPropertyDescriptor<Function>) => {
        if (!target[symbolRouters]) {
            target[symbolRouters] = [];
        }
        target[symbolRouters].push({ method, path, name });
    }
}

export function ALL(path: string) {
    return route("ALL", path);
}

export function GET(path: string) {
    return route("GET", path);
}

export function POST(path: string) {
    return route("POST", path);
}

export function DELETE(path: string) {
    return route("DELETE", path);
}

export function PUT(path: string) {
    return route("PUT", path);
}

export function OPTIONS(path: string) {
    return route("OPTIONS", path);
}