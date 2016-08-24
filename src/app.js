'use strict';

const logger = require('koa-logger');
const route = require('koa-route');
const koa = require('koa');

const app = module.exports = new koa();

app.use(logger());

app.use(route.get('/', function* () {
  this.body = 'Happy HackDay!!!';
}));

if (!module.parent) {
  app.listen(3000);
}
