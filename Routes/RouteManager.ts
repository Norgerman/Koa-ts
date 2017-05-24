interface RouteInfo {
    constructor: FunctionConstructor,
    function: Function,
}

interface RoutePrefixInfo {
    constructor: FunctionConstructor,
    prefix: string
}

interface PathInfo {
    method: string,
    path: string,
}

class RouteManager {
    private _routeMap = new Map<PathInfo, RouteInfo>();
    private _routePrefixMap = new Map<string, string>();

    public regeisterRoute(route: RouteInfo & PathInfo): RouteManager {
        this._routeMap.set({ method: route.method, path: route.path },
            { constructor: route.constructor, function: route.function })
        return this;
    }

    public regeisterRoutePrefix(routePrefixInfo: RoutePrefixInfo): RouteManager {
        this._routePrefixMap.set(routePrefixInfo.constructor.name, routePrefixInfo.prefix);
        return this;
    }

    public getRoutePrefix(routeClass: FunctionConstructor): string {
        var prefix = this._routePrefixMap.get(routeClass.name);
        if (!prefix) {
            prefix = "/";
        }

        if (prefix[prefix.length - 1] !== "/") {
            prefix += "/";
        }
        return prefix;
    }

    public get routeMap(): Map<PathInfo, RouteInfo> {
        return this._routeMap;
    }
}

export const routeManager = new RouteManager();