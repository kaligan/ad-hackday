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
  this.body = `
  <p>Happy Hackday</p>
  
  <ul>
    <li><a href='/api/applications'>applications</></li>
    <li><a href='/api/users'>users</></li>
    <li><a href='/api/devices'>devices</></li>
  </ul>
  `;
}));

// application routes
app.use(route.get('/api/applications', applications.get));

// user routes
app.use(route.get('/api/users', users.get));
app.use(route.get('/api/users/:uuid/devices', users.devices));
app.use(route.get('/api/users/:uuid/devices/:deviceUuid/activate', users.activateDevice));
app.use(route.get('/api/users/:uuid/devices/:deviceUuid/deactivate', users.deactivateDevice));
app.use(route.post('/api/users', users.post));
app.use(route.delete('/api/users/:id', users.delete));

// device routes
app.use(route.get('/api/devices', devices.get));
app.use(route.get('/api/devices/:mac/user', devices.user));
app.use(route.post('/api/devices', devices.post));
app.use(route.delete('/api/devices', devices.delete));

if (!module.parent) {
  app.listen(3000);
}
