'use strict';

const bodyParser = require('koa-body-parser');
const logger = require('koa-logger');
const route = require('koa-route');
const koa = require('koa');

const applications = require('./controllers/applications');
const users = require('./controllers/users');
const devices = require('./controllers/devices');

const app = module.exports = new koa();

app.use(logger());
app.use(bodyParser());

app.use(route.get('/', function* () {
  this.body = 'Happy HackDay!!!';
}));

// application routes
app.use(route.get('/api/hackday/applications', applications.get));

// user routes
app.use(route.get('/api/hackday/users', users.get));
app.use(route.post('/api/hackday/users', users.post));
app.use(route.delete('/api/hackday/users/:id', users.delete));

// device routes
app.use(route.get('/api/hackday/devices', devices.get));
app.use(route.post('/api/hackday/devices', devices.post));
app.use(route.delete('/api/hackday/devices', devices.delete));


if (!module.parent) {
  app.listen(3000);
}
