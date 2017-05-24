"use strict";
import * as sourceMap from "source-map-support";
import * as Koa from "koa";
import { RouterBuilder } from "./Routes/RouterBuilder";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";
import { activator } from "./DependencyInjection/Activator";
import { generateMiddleware } from "./DependencyInjection/KoaActivatorExtension";
import { A, B } from "./InjectionTest";
import "./Controllers";


sourceMap.install();

const app = new Koa();
const builder = new RouterBuilder();

activator.addSingleton("a1", A)
    .addScoped("a2", A)
    .addTransient("a3", A)
    .addTransient("b", B);

app.use(generateMiddleware(activator));

app.use(bodyParser());

app.use(builder.routes());
app.use(builder.allowedMethods());

app.listen(9001);
