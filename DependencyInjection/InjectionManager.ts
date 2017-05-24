class InjectionInfo {
    private _injectedParams: DependencyInjection.InjectedParamInfo[];
    private _injectedProperties: DependencyInjection.InjectedPropertyInfo[];
    private _className:string;

    constructor(className: string) {
        this._injectedParams = [];
        this._injectedProperties = [];
        this._className = className;
    }

    public get injectedParams() {
        return this._injectedParams;
    }

    public get injectedProperties() {
        return this._injectedProperties;
    }

}

class InjectionManager {
    private _injectionMap: Map<string, InjectionInfo> = new Map<string, InjectionInfo>();

    public getInjectionInfo(name: string) {
        return this._injectionMap.get(name);
    }

    public regeisterParam(parameter: { name: string } & DependencyInjection.InjectedParamInfo) {
        var injection = this._injectionMap.get(parameter.name)
        if (injection) {
            injection.injectedParams.push({
                parameterIndex: parameter.parameterIndex,
                injectionName: parameter.injectionName
            });
        } else {
            injection = new InjectionInfo(parameter.name)
            injection.injectedParams.push({
                parameterIndex: parameter.parameterIndex,
                injectionName: parameter.injectionName
            });
            this._injectionMap.set(parameter.name, injection);
        }
    }

    public regeisterProperty(parameter: { name: string } & DependencyInjection.InjectedPropertyInfo) {
        var injection = this._injectionMap.get(parameter.name)
        if (injection) {
            injection.injectedProperties.push({
                injectionName: parameter.injectionName,
                propertyName: parameter.propertyName
            });
        } else {
            injection = new InjectionInfo(parameter.name)
            injection.injectedProperties.push({
                injectionName: parameter.injectionName,
                propertyName: parameter.propertyName
            });
            this._injectionMap.set(parameter.name, injection);
        }

    }
}

export const injectionManager: InjectionManager = new InjectionManager();