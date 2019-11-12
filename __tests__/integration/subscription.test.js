import truncate from '../../src/utils/truncate';

describe('Subscription', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('test', () => {});

  // it('should  be able to subscribe ', async () => {
  //   await request(app)
  //     .post('/users')
  //     .send({
  //       name: 'Mário',
  //       email: 'mario@gmail.com',
  //       password: '123123',
  //     });

  //   await request(app)
  //     .post('/users')
  //     .send({
  //       name: 'João',
  //       email: 'joao@gmail.com',
  //       password: '123123',
  //     });

  //   const createFirstUserSession = await request(app)
  //     .post('/sessions')
  //     .send({ email: 'mario@gmail.com', password: '123123' });

  //   const createSecondUserSession = await request(app)
  //     .post('/sessions')
  //     .send({ email: 'joao@gmail.com', password: '123123' });

  //   const firstToken = createFirstUserSession.body.token;
  //   const secondToken = createSecondUserSession.body.token;

  //   const firstMeetup = await factory.attrs('Meetup');

  //   const createFirstMeetup = await request(app)
  //     .post('/meetups')
  //     .set('Authorization', `Bearer ${firstToken}`)
  //     .send(firstMeetup);
  //   const firstId = createFirstMeetup.body.id;

  //   const secondMeetup = await factory.attrs('Meetup');

  //   await request(app)
  //     .post('/meetups')
  //     .set('Authorization', `Bearer ${secondToken}`)
  //     .send(secondMeetup);

  //   const createSubscription = await request(app)
  //     .post(`/subscriptions/${firstId}`)
  //     .set('Authorization', `Bearer ${secondToken}`)
  //     .send();
  //   expect(createSubscription.status).toBe(200);
  // });

  // it('should not be able to subscribe in your own meetup', async () => {
  //   const user = await factory.attrs('User');

  //   await request(app)
  //     .post('/users')
  //     .send(user);

  //   const createUserSession = await request(app)
  //     .post('/sessions')
  //     .send({ email: user.email, password: user.password });

  //   const { token } = createUserSession.body;

  //   const meetup = await factory.attrs('Meetup');
  //   const createMeetup = await request(app)
  //     .post('/meetups')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(meetup);
  //   const { id } = createMeetup.body;

  //   const createSubscription = await request(app)
  //     .post(`/subscriptions/${id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send();

  //   expect(createSubscription.status).toBe(400);
  // });
});
