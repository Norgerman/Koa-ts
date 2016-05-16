"use strict";
import * as sourceMap from "source-map-support";
import * as Koa from "koa";
import {RouterBuilder} from "./Routes/RouterBuilder";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";

sourceMap.install();

const app = new Koa();
const builder = new RouterBuilder();

app.use(bodyParser());

app.use(builder.routes());
app.use(builder.allowedMethods());

app.listen(9001);
