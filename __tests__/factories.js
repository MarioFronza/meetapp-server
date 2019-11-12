import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Meetup from '../src/app/models/Meetup';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Meetup', Meetup, {
  title: 'Meetup',
  description: 'Lorem ipsum',
  location: 'Ibirama',
  date: '2019-12-012 17:45',
});

export default factory;
