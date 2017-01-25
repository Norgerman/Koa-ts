"use strict";

export function routePrefix(prefix: string): ClassDecorator {
    return target => {
        target.routePrefix = prefix;
    }
}

export function route(method: string, path: string): MethodDecorator {
    return (target, name, descriptor) => {
        if (!target.routers) {
            target.routers = [];
        }
        target.routers.push({method, path, name});
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