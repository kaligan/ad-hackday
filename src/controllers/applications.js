'use strict';

const got = require('got');
const db = require('../db');

module.exports = {
  *get() {
    const mac = this.request.header['x-user-mac'];

    const users = db.users.find({ mac });
    const user = users[0];

    if (user && user.access_token) {
      const uri = `localhost:3001/api/users/${user.uuid}/companies/${user.company_uuid}/applications`;
      const applicationsResponse = yield got(uri, {
        headers: {
          authorization: user.access_token,
          'x-channel': 'clevertouch'
        }
      });

      this.body = JSON.parse(applicationsResponse.body);
    } else {
      const applicationsResponse = yield got('localhost:3001/api/marketplace/applications?channel=clevertouch');
      const applications = JSON.parse(applicationsResponse.body);
      this.body = applications;
    }
  }
};
