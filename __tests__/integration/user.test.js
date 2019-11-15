import request from 'supertest';
import app from '../../src/app';

import truncate from '../../src/utils/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be return a user with valid token', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const createUserSession = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const { token } = createUserSession.body;

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should not be return a user with invalid token', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwi' +
      'SI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJ' +
      'f36POk6yJV_adQssw5c';

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it('should not be return a user without token', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(401);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
  });

  it('should not be able to register with invalid e-mail', async () => {
    const user = {
      name: 'name',
      email: '',
      password: '123123',
    };

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be able to update user', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const createUserSession = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const { token } = createUserSession.body;

    const newUser = {
      name: 'newName',
      email: 'newemail@gmail.com',
    };

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);

    expect(response.status).toBe(200);
  });

  it('should not be able to update user with invalid e-mail', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const createUserSession = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const { token } = createUserSession.body;

    const newUser = {
      name: '',
      email: 'invalid e-mail',
    };

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);

    expect(response.status).toBe(400);
  });

  it('should not be able to update user without valid password', async () => {
    const user = await factory.attrs('User', {
      password: '123123',
    });

    await request(app)
      .post('/users')
      .send(user);

    const createUserSession = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const { token } = createUserSession.body;

    const newUser = {
      name: 'User',
      email: 'email@test.com',
      oldPassword: '123123',
    };

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);

    expect(response.status).toBe(400);
  });

  it('should not be able to update user without valid confirm password', async () => {
    const user = await factory.attrs('User', {
      password: '123123',
    });

    await request(app)
      .post('/users')
      .send(user);

    const createUserSession = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const { token } = createUserSession.body;

    const newUser = {
      name: 'User',
      email: 'email@test.com',
      oldPassword: '123123',
      password: '123456',
    };

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);

    expect(response.status).toBe(400);
  });

  it('should not be able to update user with invalid old password', async () => {
    const user = await factory.attrs('User', {
      password: '123123',
    });

    await request(app)
      .post('/users')
      .send(user);

    const createUserSession = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const { token } = createUserSession.body;

    const newUser = {
      oldPassword: '123456',
      password: '123456',
      confirmPassword: '123456',
    };

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);
    expect(response.status).toBe(401);
  });

  it('should not be able to update user with duplicated e-mail', async () => {
    const otherUser = await factory.attrs('User', {
      email: 'otheruser@email.com',
    });

    await request(app)
      .post('/users')
      .send(otherUser);

    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const createUserSession = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const { token } = createUserSession.body;

    const newUser = {
      name: 'test',
      email: 'otheruser@email.com',
    };

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);

    expect(response.status).toBe(400);
  });
});
