export function injectParam(name: string): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        console.log(target);
        console.log(propertyKey)
        console.log(parameterIndex);
    }
}

export function inject(name: string): PropertyDecorator {
    return (target, propertyKey) => {
        console.log(target);
        console.log(propertyKey);
    }
}