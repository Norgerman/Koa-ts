import * as Koa from "koa";

export function generateMiddleware(activator: DependencyInjection.Activator): Koa.Middleware {
    return async (ctx, next) => {
        activator.createScopedService();
        await next();
        activator.clearScopedService();
        return;
    }
}