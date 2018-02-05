import { injectionManager } from "./InjectionManager";

export class Activator implements DependencyInjection.Activator {
    private services: Map<string, DependencyInjection.ServiceInfo>;

    constructor() {
        this.services = new Map<string, DependencyInjection.ServiceInfo>();
    }

    add(service: DependencyInjection.ServiceInfo) {
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

    get<T>(name: string): T | null | undefined {
        let service = this.services.get(name);
        let result: T | null = null;

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
        let injectedParams: DependencyInjection.InjectedParamInfo[];
        let injectedProperties: DependencyInjection.InjectedPropertyInfo[];
        let params: any[] = [];
        let result: any;
        let info = injectionManager.getInjectionInfo(constructor.name);

        if (info) {
            injectedParams = info.injectedParams;
            injectedProperties = info.injectedProperties;
        } else {
            injectedParams = [];
            injectedProperties = [];
        }

        for (let item of injectedParams) {
            let servciceInstance = this.get(item.injectionName)

            while (item.parameterIndex > params.length - 1) {
                params.push(null);
            }

            params[item.parameterIndex] = servciceInstance
        }

        result = Reflect.construct(constructor, params);
        for (let item of injectedProperties) {
            result[item.propertyName] = this.get(item.injectionName);
        }

        return result;
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