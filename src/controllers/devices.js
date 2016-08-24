'use strict';
const duuidGenerator = require('uuid');

const db = require('../db');

module.exports = {
  key: 'devices',

  *get() {
    this.body = db.devices.find();
  },

  /**
   * mac: '',
   * user_mac: '',
   * device_name: '',
   * description: '',
   * paired: false
   */
  *post() {
    const deviceRegistration = Object.assign({ uuid: duuidGenerator.v1() }, this.request.fields);

    if (!deviceRegistration.mac || !deviceRegistration.device_name || !deviceRegistration.user_mac) {
      this.status = 422;
      this.body = {
        status: 422,
        error: 'Unprocessable Entity',
        message: 'Required fields include mac, user_mac, name'
      };
      return;
    }

    if (!deviceRegistration.user_mac) {
      this.status = 422;
      return;
    }

    db.devices.insert(deviceRegistration);
    this.status = 201;
    this.body = deviceRegistration;
  },

  *delete(uuid) {
    const device = db.devices.find({ uuid });
    db.devices.remove(device);
    this.body = { uuid };
  }
};
