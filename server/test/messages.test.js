import { expect } from 'chai';
import sinon from 'sinon';
import { addMessage, getMessages } from '../controllers/messages.js';
import Message from "../models/Message.js";

describe('Message Controller Functions', () => {
  describe('addMessage', () => {
    it('should return 500 status if there is an error adding a message', async () => {
      // Stub the Message model's save method to simulate an error
      const saveStub = sinon.stub(Message.prototype, 'save').rejects(new Error('Error saving message'));

      // Mock request and response objects
      const req = { body: { /* mock message data */ } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Call the addMessage function
      await addMessage(req, res);

      // Assertions
      expect(res.status.calledWithExactly(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      // Restore the stub to its original state
      saveStub.restore();
    });
  });

  describe('getMessages', () => {
    it('should retrieve messages for a specific conversation', async () => {
      // Stub the Message model's find method to return mock messages
      const findStub = sinon.stub(Message, 'find').resolves([{ /* mock message data */ }]);

      // Mock request and response objects
      const req = { params: { conversationId: 'conversationId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Call the getMessages function
      await getMessages(req, res);

      // Assertions
      expect(res.status.calledWithExactly(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      // Restore the stub to its original state
      findStub.restore();
    });

    it('should return 500 status if there is an error retrieving messages', async () => {
      // Stub the Message model's find method to simulate an error
      const findStub = sinon.stub(Message, 'find').rejects(new Error('Error retrieving messages'));

      // Mock request and response objects
      const req = { params: { conversationId: 'conversationId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };

      // Call the getMessages function
      await getMessages(req, res);

      // Assertions
      expect(res.status.calledWithExactly(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      // Restore the stub to its original state
      findStub.restore();
    });
  });
});
