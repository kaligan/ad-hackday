'use strict';
const duuidGenerator = require('uuid');

const db = require('../db');

module.exports = {
  key: 'devices',

  *get() {
    this.body = db.devices.find();
  },

  *post() {
    const deviceRegistration = Object.assign({ uuid: duuidGenerator.v1() }, this.request.body);
    db.devices.insert(deviceRegistration);
    this.status = 201;
    this.body = deviceRegistration ;
  },

  *delete() {
    const device = db.devices.find({uuid});
    db.devices.remove(device);
    this.body = {uuid};
  }
};
