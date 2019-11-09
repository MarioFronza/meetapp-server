/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const mongoose = require('mongoose');
const databaseTestConfig = require('../config/databaseTest');

beforeEach(function(done) {
  function clearDB() {
    mongoose.connection.collections.map(key => {
      return mongoose.connection.collections[key].remove(function() {});
    });
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(databaseTestConfig.uri, function(err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach(function(done) {
  mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});
