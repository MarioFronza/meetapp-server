/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const faker = require('faker');
const { fakerBr } = require('js-brasil');
const { factory } = require('factory-girl');

const Meetup = require('../models/Meetup');

factory.define('Meetup', Meetup, {
  title: faker.name.findName(),
  file_id: faker.random.uuid(),
  description: faker.name.jobDescriptor(),
  location: faker.address.streetAddress(),
  date: faker.date.future(),
});

module.exports = { factory };
