import { injectionManager } from "./InjectionManager";

export function injectParam(injectionName: string): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        if (propertyKey !== null && propertyKey !== undefined) {
            //the parameter is not constructor parameter
            return;
        }

        injectionManager.regeisterParam({
            name: (target as Function).name,
            injectionName: injectionName,
            parameterIndex: parameterIndex
        })
    }
}

export function injectProperty(injectionName: string): PropertyDecorator {
    return (target, propertyName: string) => {
        injectionManager.regeisterProperty({
            name: target.constructor.name,
            injectionName,
            propertyName
        })
    }
}