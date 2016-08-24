'use strict';

const got = require('got');
const db = require('../db');

module.exports = {
  *get() {
    const mac = this.request.header['x-user-mac'];

    const user = db.users.find({ mac });

    if (user && user.access_token) {
      const applicationsResponse = yield got('https://myapps-edge.appdirect.com/api/users/myapps', {
        headers: {
          authorization: user.access_token
        }
      });
      const applications = JSON.parse(applicationsResponse.body);
      this.body = applications;
    } else {
      const applicationsResponse = yield got('https://myapps-edge.appdirect.com/api/marketplace/applications?channel=clevertouch');
      const applications = JSON.parse(applicationsResponse.body);
      this.body = applications;
    }
  }
};
