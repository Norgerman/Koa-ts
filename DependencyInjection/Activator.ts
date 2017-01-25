import * as Koa from "koa";
import { symbolInjectParams, symbolInjectProperties, InjectParamInfo, InjectPropertyInfo } from "./Decorator";

export interface ServiceInfo {
    name: string;
    constructor: Function;
    value?: any;
    lifeTime: "transient" | "scoped" | "singleton";
}

class Activator {
    private services: Map<string, ServiceInfo>;

    add(service: ServiceInfo) {
        if (service.lifeTime == "singleton" && !service.value) {
            service.value = this.createInstance(service.constructor);
        }
        this.services.set(service.name, service);
        return this;
    }

    addSingleton<T>(name: string, constructor: Function, value?: T) {
        return this.add({ name: name, constructor: constructor, value: value, lifeTime: "singleton" });
    }

    addScoped<T>(name: string, constructor: Function) {
        return this.add({ name: name, constructor: constructor, lifeTime: "scoped" });
    }

    addTransient<T>(name: string, constructor: Function) {
        return this.add({ name: name, constructor: constructor, lifeTime: "transient" });
    }

    get<T>(name: string): T {
        let service = this.services.get(name);
        let result: T = null;

        if (!service) {
            return null;
        }

        result = service.value;
        if (!result) {
            result = this.createInstance(service.constructor);
        }
        return result;
    }

    createInstance(constructor: Function): any {
        let injectParams: InjectParamInfo[] = constructor[symbolInjectParams];
        let InjectProperties: InjectPropertyInfo[] = constructor.prototype[symbolInjectProperties];
        let params: any[] = [];
        let result: any;

        for (let item of injectParams) {
            let servciceInstance = this.get(item.name)

            while (item.index > params.length - 1) {
                params.push(null);
            }

            params[item.index] = servciceInstance
        }

        result = Reflect.construct(constructor, params);
        for (let item of InjectProperties) {
            result[item.propertyName] = this.get(item.injectionName);
        }

        return result;
    }

    generateMiddleware(this: Activator): Koa.Middleware {
        return async (ctx, next) => {
            this.createScopedService();
            await next();
            this.clearScopedService();
            return;
        }
    }

    createScopedService() {
        for (let [key, value] of this.services) {
            if (value.lifeTime == "scoped") {
                value.value = this.createInstance(value.constructor);
            }
        }
    }

    clearScopedService() {
        for (let [key, value] of this.services) {
            if (value.lifeTime == "scoped") {
                value.value = null;
            }
        }
    }
}

export const activator = new Activator();