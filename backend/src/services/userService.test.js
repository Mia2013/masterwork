import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../app';
import User from '../models/User';
import 'dotenv/config';


jest.mock('../middlewares/authorization');

let testUserId;

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn().mockReturnValue('abc'),
}));

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function createNewUser() {
  const user = new User({
    name: 'test',
    email: 'test@test.com',
    password: await hashPassword('password'),
    isAdmin: false,
    isVerified: false,
  });

  const user2 = new User({
    name: 'test2',
    email: 'taken@email.com',
    password: await hashPassword('password'),
    isAdmin: false,
    isVerified: false,
  });

  const newUser = await user.save();
  await user2.save();
  return newUser;
}

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, { useNewUrlParser: true });
  const testUser = await createNewUser();
  testUserId = testUser._id.toString();
});

afterAll(async () => {
  await User.deleteMany();
  mongoose.connection.close();
});

describe('PATCH /api/users', () => {
  test('should respond with 400 & "Can\'t find user profile" if HEADER has no userId', (done) => {
    const reqBody = {
      name: 'Valaki',
      email: 'valaki@email.com',
      currentPassword: 'currentPassword',
      newPassword: 'newPassword',
    };

    request(app)
      .patch('/api/users')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('A felhasználó nem található');
        return done();
      });
  });

  test('should respond with 400 if no field was filled', (done) => {
    const reqBody = {
      name: '',
      email: '',
      currentPassword: 'password',
      newPassword: '',
    };

    request(app)
      .patch('/api/users')
      .set('Content-Type', 'application/json')
      .set('userId', testUserId)
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Nem küldött új adatot');
        return done();
      });
  });

  test('should respond with 400 if invalid password entered', (done) => {
    const reqBody = {
      name: 'name',
      email: 'email',
      currentPassword: 'badPassword',
      newPassword: 'newPassword',
    };

    request(app)
      .patch('/api/users')
      .set('Content-Type', 'application/json')
      .set('userId', testUserId)
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Hibás jelszót adott meg');
        return done();
      });
  });

  test('should respond with 400 if invalid email entered', (done) => {
    const reqBody = {
      name: '',
      email: 'email',
      currentPassword: 'password',
      newPassword: '',
    };

    request(app)
      .patch('/api/users')
      .set('Content-Type', 'application/json')
      .set('userId', testUserId)
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Nem megfelelő email formátum.');
        return done();
      });
  });

  test('should respond with 400 if new email is taken', (done) => {
    const reqBody = {
      name: '',
      email: 'taken@email.com',
      currentPassword: 'password',
      newPassword: '',
    };

    request(app)
      .patch('/api/users')
      .set('Content-Type', 'application/json')
      .set('userId', testUserId)
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Sajnos ez az email cím már foglalt');
        return done();
      });
  });

  test('should respond with 200 if all good', (done) => {
    const reqBody = {
      name: 'newName',
      email: 'newEmail@email.com',
      currentPassword: 'password',
      newPassword: '',
    };

    request(app)
      .patch('/api/users')
      .set('Content-Type', 'application/json')
      .set('userId', testUserId)
      .send(reqBody)
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          token: 'abc',
        });
        return done();
      });
  });
});
