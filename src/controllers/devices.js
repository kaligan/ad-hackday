'use strict';

module.exports = {
  *get() {
    this.body = [];
  },

  *post() {
    this.body = {};
  },

  *delete() {
    this.body = {};
  }
};
