// userController.test.js
import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User.js';
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js'; // Adjust the path based on your project structure

describe('getUser function', () => {
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

  it('should return user when findById is successful', async () => {
    const mockUser = {
      _id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    // Stub the findById method of the User model
    const findByIdStub = sinon.stub(User, 'findById');
    findByIdStub.withArgs('123').resolves(mockUser);

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
    expect(res.json.calledWithExactly(mockUser)).to.be.true;

    // Restore the stub to its original state
    findByIdStub.restore();
  });

  it('should return 404 status when findById fails', async () => {
    // Stub the findById method of the User model to simulate an error
    const findByIdStub = sinon.stub(User, 'findById');
    findByIdStub.rejects(new Error('User not found'));

    // Mock request and response objects
    const req = { params: { id: '456' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the getUser function
    await getUser(req, res);

    // Assertions
    expect(res.status.calledWithExactly(404)).to.be.true;
    expect(res.json.calledWithExactly({ message: 'User not found' })).to.be.true;

    // Restore the stub to its original state
    findByIdStub.restore();
  });
});

describe('getUserFriends function', () => {
  it('should return formatted friends when user has friends', async () => {
    const mockUser = {
      _id: '123',
      friends: ['456', '789'],
    };
    const mockFriends = [
      {
        _id: '456',
        firstName: 'Alice',
        lastName: 'Wonderland',
        occupation: 'Software Engineer',
        location: 'Wonderland',
        picturePath: '/images/alice.jpg',
      },
      {
        _id: '789',
        firstName: 'Bob',
        lastName: 'Builder',
        occupation: 'Architect',
        location: 'Builderland',
        picturePath: '/images/bob.jpg',
      },
    ];

    // Stub the findById method of the User model
    const findByIdStub = sinon.stub(User, 'findById');
    findByIdStub.withArgs('123').resolves(mockUser);
    findByIdStub.withArgs('456').resolves(mockFriends[0]);
    findByIdStub.withArgs('789').resolves(mockFriends[1]);

    // Mock request and response objects
    const req = { params: { id: '123' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the getUserFriends function
    await getUserFriends(req, res);

    // Assertions
    expect(res.status.calledWithExactly(200)).to.be.true;
    expect(res.json.calledWithExactly(mockFriends)).to.be.true;

    // Restore the stub to its original state
    findByIdStub.restore();
  });

  it('should return 404 status when findById fails in getUserFriends', async () => {
    // Stub the findById method of the User model to simulate an error
    const findByIdStub = sinon.stub(User, 'findById');
    findByIdStub.rejects(new Error('User not found'));

    // Mock request and response objects
    const req = { params: { id: '456' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the getUserFriends function
    await getUserFriends(req, res);

    // Assertions
    expect(res.status.calledWithExactly(404)).to.be.true;
    expect(res.json.calledWithExactly({ message: 'User not found' })).to.be.true;

    // Restore the stub to its original state
    findByIdStub.restore();
  });
});