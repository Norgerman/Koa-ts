declare namespace DependencyInjection {
    interface Activator {
        createScopedService(): void;
        clearScopedService(): void;
        add(service: ServiceInfo);
        get<T>(name: string): T;
        createInstance(constructor: Function): any;
    }

    interface ServiceInfo {
        name: string;
        constructor: Function;
        value?: any;
        lifeTime: "transient" | "scoped" | "singleton";
    }


    interface InjectedParamInfo {
        parameterIndex: number,
        injectionName: string
    }

    interface InjectedPropertyInfo {
        injectionName: string,
        propertyName: string
    }
}