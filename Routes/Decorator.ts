"use strict";

export function RoutePrefix(prefix: string): ClassDecorator {
    return target => {
        target.routePrefix = prefix;
    }
}

export function Route(method: string, path: string): MethodDecorator {
    return (target, name, descriptor) => {
        if (!target.routers) {
            target.routers = [];
        }
        target.routers.push({method, path, name});
    }
}

export function ALL(path: string) {
    return Route("ALL", path);
}

export function GET(path: string) {
    return Route("GET", path);
}

export function POST(path: string) {
    return Route("POST", path);
}

export function DELETE(path: string) {
    return Route("DELETE", path);
}

export function PUT(path: string) {
    return Route("PUT", path);
}

export function OPTIONS(path: string) {
    return Route("OPTIONS", path);
}