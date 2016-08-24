'use strict';
const uuidGenerator = require('uuid');
const db = require('../db');

module.exports = {
  *get() {
    this.body = db.users.find();
  },

  *post() {
    const userRegistration = Object.assign({ uuid: uuidGenerator.v1() }, this.request.body);
    db.users.insert(userRegistration);
    this.status = 201;
    this.body = userRegistration;
  },

  *delete(uuid) {
    const user = db.users.find({ uuid });
    db.users.remove(user);
    this.body = {
      uuid
    };
  }
};
