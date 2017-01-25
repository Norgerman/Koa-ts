export const symbolInjectParams = Symbol("injectParams");
export const symbolInjectProperties = Symbol("injectProperties");

export interface InjectParamInfo {
    name: string;
    index: number;
}

export interface injectPropertyInfo {
    injectionName: string;
    propertyName: PropertyKey;
}

export function injectParam(name: string): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        if (propertyKey !== null && propertyKey !== undefined) {
            //the parameter is not constructor parameter
            return;
        }

        let injectParams: InjectParamInfo[] = target[symbolInjectParams];
        
        if (!injectParams) {
            injectParams = []
        }

        injectParams.push({ name: name, index: parameterIndex });
        target[symbolInjectParams] = injectParams;
    }
}

export function injectProperty(name: string): PropertyDecorator {
    return (target, propertyKey) => {
        let injectProperties: injectPropertyInfo[] = target[symbolInjectProperties];
        
        if (!symbolInjectProperties) {
            injectProperties = [];
        }

        injectProperties.push({ injectionName: name, propertyName: propertyKey });
        target[symbolInjectProperties] = injectProperties;
    }
}