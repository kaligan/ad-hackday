'use strict';
const LokiJS = require('lokijs');

const loki = new LokiJS('loki.json');
const devices = loki.addCollection('devices');
const users = loki.addCollection('users');

module.exports.loki = loki;
module.exports.devices = devices;
module.exports.users = users;
