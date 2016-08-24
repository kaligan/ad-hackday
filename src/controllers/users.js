'use strict';

const db = require('../db');

module.exports = {
  *get() {
    this.body = db.devices.find();
  },

  *post() {
    this.body = {};
  },

  *delete() {
    this.body = {};
  }
};
