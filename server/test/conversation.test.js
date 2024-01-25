import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Conversation from '../models/Conversation.js';
import {
  createConversation,
  getConversationsOfUser,
  getConversationBetweenUsers,
  deleteConversation
} from '../controllers/conversations.js';

describe('Conversation Controller Functions', () => {
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

  it('should create a new conversation', async () => {
    // Stub the save method of the Conversation model
    const saveStub = sinon.stub(Conversation.prototype, 'save').resolves({
      _id: '123',
      members: ['456', '789'],
    });

    // Mock request and response objects
    const req = { body: { senderId: '456', receiverId: '789' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the createConversation function
    await createConversation(req, res);

    // Assertions
    expect(res.status.calledWithExactly(201)).to.be.true;
    expect(res.json.calledWithExactly({ _id: '123', members: ['456', '789'] })).to.be.true;

    // Restore the stub to its original state
    saveStub.restore();
  });

  it('should get conversations of a user', async () => {
    // Stub the find method of the Conversation model
    const findStub = sinon.stub(Conversation, 'find').resolves([
      {
        _id: '123',
        members: ['456', '789'],
      },
      {
        _id: '456',
        members: ['123', '789'],
      },
    ]);

    // Mock request and response objects
    const req = { params: { userId: '789' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the getConversationsOfUser function
    await getConversationsOfUser(req, res);

    // Assertions
    expect(res.status.calledWithExactly(200)).to.be.true;
    expect(res.json.calledWithExactly([
      { _id: '123', members: ['456', '789'] },
      { _id: '456', members: ['123', '789'] },
    ])).to.be.true;

    // Restore the stub to its original state
    findStub.restore();
  });

  it('should get conversation between two users', async () => {
    // Stub the findOne method of the Conversation model
    const findOneStub = sinon.stub(Conversation, 'findOne').resolves({
      _id: '123',
      members: ['456', '789'],
    });

    // Mock request and response objects
    const req = { params: { firstUserId: '456', secondUserId: '789' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the getConversationBetweenUsers function
    await getConversationBetweenUsers(req, res);

    // Assertions
    expect(res.status.calledWithExactly(200)).to.be.true;
    expect(res.json.calledWithExactly({ _id: '123', members: ['456', '789'] })).to.be.true;

    // Restore the stub to its original state
    findOneStub.restore();
  });

  it('should delete a conversation', async () => {
    // Stub the findByIdAndDelete method of the Conversation model
    const findByIdAndDeleteStub = sinon.stub(Conversation, 'findByIdAndDelete').resolves();

    // Mock request and response objects
    const req = { params: { conversationId: '123' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the deleteConversation function
    await deleteConversation(req, res);

    // Assertions
    expect(res.status.calledWithExactly(200)).to.be.true;
    expect(res.json.calledWithExactly({ message: "Conversation deleted successfully" })).to.be.true;

    // Restore the stub to its original state
    findByIdAndDeleteStub.restore();
  });
});
