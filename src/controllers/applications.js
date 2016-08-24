'use strict';

const got = require('got');

module.exports = {
  *get() {
    const applicationsResponse = yield got('https://myapps-edge.appdirect.com/api/marketplace/applications?channel=clevertouch');
    const applications = JSON.parse(applicationsResponse.body);
    this.body = applications;
  }
};
