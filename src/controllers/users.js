'use strict';
const db = require('../db');

module.exports = {
  *get() {
    this.body = db.users.find();
  },

  *post() {
    let user = this.request.body;
    if (typeof user === 'string') {
      user = JSON.parse(user);
    }

    db.users.insert(user);
    this.status = 201;
    this.body = user;
  },

  *delete(uuid) {
    const user = db.users.find({ uuid });
    db.users.remove(user);
    this.body = {
      uuid
    };
  }
};
