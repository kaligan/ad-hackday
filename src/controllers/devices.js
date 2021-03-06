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
    const deviceRegistration = Object.assign({ uuid: duuidGenerator.v1() }, this.request.body);

    if (!deviceRegistration.mac || !deviceRegistration.device_name || !deviceRegistration.user_mac) {
      this.status = 422;
      this.body = {
        status: 422,
        message: 'Required fields include mac, user_mac, name'
      };
      return;
    }

    const user = db.users.find({ user_mac: deviceRegistration.user_mac });
    if (!user) {
      this.status = 400;
      this.body = {
        status: 400,
        message: 'Invalid user'
      };
      return;
    }

    db.devices.insert(deviceRegistration);
    this.status = 201;
    this.body = deviceRegistration;
  },

  *user(mac) {
    const user = db.users.find({ mac });
    if (!user || user.length === 0) {
      this.status = 404;
      return;
    }

    this.body = user[0].profile;
  },

  *delete(uuid) {
    const device = db.devices.find({ uuid });
    db.devices.remove(device);
    this.body = { uuid };
  }
};
