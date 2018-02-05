"use strict";
import { injectParam, injectProperty } from "../DependencyInjection/Decorator"

export class A {
    value: number
    constructor() {
        this.value = Math.random();
    }
}

export class B {
    @injectProperty("a1")
    v1!: A;
    v2: A;
    @injectProperty("a3")
    v3!: A;
    @injectProperty("a1")
    v4!: A;
    constructor(@injectParam("a2") p) {
        this.v2 = p;
    }
}