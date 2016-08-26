'use strict';
const got = require('got');
const db = require('../db');

module.exports = {
  *get() {
    this.body = db.users.find();
  },

  *devices(uuid) {
    const users = db.users.find({ uuid });
    if (!users || users.length === 0) {
      this.body = [
        {
          uuid: '89878610-6b1e-11e6-9aaf-054dab1efe05',
          description: 'Teacher store',
          device_name: 'Cleverstore',
          mac: '22:22:EC:B9:E1:3A',
          user_mac: 'CC:20:E8:76:1A:BF',
          meta: {
            revision: 0,
            created: 1472168958193,
            version: 0
          }
        }
      ];
      return;
    }

    this.body = db.devices.find({
      user_mac: users[0].mac
    });
  },

  *post() {
    let user = this.request.body;
    if (typeof user === 'string') {
      user = JSON.parse(user);
    }

    const profileResponse = yield got(`localhost:3001/api/users/${user.uuid}`, {
      headers: {
        authorization: user.access_token,
        'x-channel': 'clevertouch'
      }
    });

    user.profile = JSON.parse(profileResponse.body);
    delete user.profile.metadata;
    delete user.profile.links;
    delete user.profile.ldapid;
    delete user.profile.boostUser;

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
