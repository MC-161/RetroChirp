import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User.js';
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js';

describe('User Controller Functions', () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should get a user by id', async () => {
    // Stub the findById method of the User model
    const findByIdStub = sinon.stub(User, 'findById').resolves({
      _id: '123',
      firstName: 'John',
      lastName: 'Doe',
    });

    // Mock request and response objects
    const req = { params: { id: '123' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the getUser function
    await getUser(req, res);

    // Assertions
    expect(res.status.calledWithExactly(200)).to.be.true;
    expect(res.json.calledWithExactly({ _id: '123', firstName: 'John', lastName: 'Doe' })).to.be.true;

    // Restore the stub to its original state
    findByIdStub.restore();
  });

});
