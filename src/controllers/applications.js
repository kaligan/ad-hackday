'use strict';

const got = require('got');

module.exports = {
  *get() {
    const userMac = this.request.header['x-user-mac'];


    const applicationsResponse = yield got('https://myapps-edge.appdirect.com/api/marketplace/applications?channel=clevertouch');
    const applications = JSON.parse(applicationsResponse.body);
    this.body = applications;
  }
};
