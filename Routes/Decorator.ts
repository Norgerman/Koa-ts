"use strict";

import { routeManager } from "./RouteManager";

export function routePrefix(prefix: string): ClassDecorator {
    return target => {
        routeManager.regeisterRoutePrefix({ constructor: target, prefix });
    }
}

export function route(method: string, path: string) {
    return <T extends object,
        R extends Promise<any>>(target: T, name: keyof T, descriptor: TypedPropertyDescriptor<(...args: any[]) => R>) => {
        routeManager.regeisterRoute({
            constructor: target.constructor,
            function: descriptor.value,
            method,
            path
        });
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