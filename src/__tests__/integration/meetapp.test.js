const request = require('supertest');
const faker = require('../../app/utils/faker');

const app = './app';
const meetups = '/meetups';

describe('Meetup', () => {
  let meetup;

  it('should register a meetup', async () => {
    meetup = await faker.attrs('Meetup');
    const response = await request(app)
      .post(meetups)
      .send(meetup);
    meetup = response.body;
    expect(response.statusCode).toBe(200);
  });
});
