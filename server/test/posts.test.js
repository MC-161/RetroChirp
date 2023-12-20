import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { createPost, getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js'; // Adjust the path based on your project structure

describe('Post Controller', () => {
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

  describe('createPost function', () => {
    it('should create a new post and return posts', async () => {
      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        location: 'City',
        picturePath: '/images/john.jpg',
      };

      const mockRequest = {
        body: {
          userId: 'user123',
          description: 'New post description',
          picturePath: '/images/newpost.jpg',
        },
      };

      // Stub the findById and save methods of the User model
      const findByIdStub = sinon.stub(User, 'findById');
      findByIdStub.withArgs('user123').resolves(mockUser);

      // Stub the save method of the Post model
      const saveStub = sinon.stub(Post.prototype, 'save');

      // Mock request and response objects
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the createPost function
      await createPost(mockRequest, res);

      // Assertions
      expect(res.status.calledWithExactly(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      // Restore the stubs to their original state
      findByIdStub.restore();
      saveStub.restore();
    });

    it('should handle errors and return 409 status', async () => {
      // Stub the findById method of the User model to simulate an error
      const findByIdStub = sinon.stub(User, 'findById');
      findByIdStub.rejects(new Error('User not found'));

      const mockRequest = {
        body: {
          userId: 'user123',
          description: 'New post description',
          picturePath: '/images/newpost.jpg',
        },
      };

      // Mock request and response objects
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the createPost function
      await createPost(mockRequest, res);

      // Assertions
      expect(res.status.calledWithExactly(409)).to.be.true;
      expect(res.json.calledWithExactly({ message: 'User not found' })).to.be.true;

      // Restore the stub to its original state
      findByIdStub.restore();
    });
  });

  describe('getFeedPosts function', () => {
    it('should return all posts in the feed', async () => {
      // Stub the find method of the Post model
      const findStub = sinon.stub(Post, 'find');
      findStub.resolves([{ _id: 'post1' }, { _id: 'post2' }]);

      // Mock request and response objects
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the getFeedPosts function
      await getFeedPosts(req, res);

      // Assertions
      expect(res.status.calledWithExactly(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      // Restore the stub to its original state
      findStub.restore();
    });

    it('should handle errors and return 404 status', async () => {
      // Stub the find method of the Post model to simulate an error
      const findStub = sinon.stub(Post, 'find');
      findStub.rejects(new Error('Posts not found'));

      // Mock request and response objects
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the getFeedPosts function
      await getFeedPosts(req, res);

      // Assertions
      expect(res.status.calledWithExactly(404)).to.be.true;
      expect(res.json.calledWithExactly({ message: 'Posts not found' })).to.be.true;

      // Restore the stub to its original state
      findStub.restore();
    });
  });

  describe('getUserPosts function', () => {
    it('should return posts of a specific user', async () => {
      const mockRequest = {
        params: {
          userId: 'user123',
        },
      };

      // Stub the find method of the Post model
      const findStub = sinon.stub(Post, 'find');
      findStub.withArgs({ userId: 'user123' }).resolves([{ _id: 'post1' }, { _id: 'post2' }]);

      // Mock request and response objects
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the getUserPosts function
      await getUserPosts(mockRequest, res);

      // Assertions
      expect(res.status.calledWithExactly(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      // Restore the stub to its original state
      findStub.restore();
    });

    it('should handle errors and return 404 status', async () => {
      const mockRequest = {
        params: {
          userId: 'user123',
        },
      };

      // Stub the find method of the Post model to simulate an error
      const findStub = sinon.stub(Post, 'find');
      findStub.rejects(new Error('User posts not found'));

      // Mock request and response objects
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the getUserPosts function
      await getUserPosts(mockRequest, res);

      // Assertions
      expect(res.status.calledWithExactly(404)).to.be.true;
      expect(res.json.calledWithExactly({ message: 'User posts not found' })).to.be.true;

      // Restore the stub to its original state
      findStub.restore();
    });
  });

  describe('likePost function', () => {
    it('should toggle the like status of a post and return the updated post', async () => {
      const mockRequest = {
        params: {
          id: 'post123',
        },
        body: {
          userId: 'user123',
        },
      };

      const mockPost = {
        _id: 'post123',
        likes: new Map([['user123', true]]),
      };

      // Stub the findById, findByIdAndUpdate, and save methods of the Post model
      const findByIdStub = sinon.stub(Post, 'findById');
      findByIdStub.withArgs('post123').resolves(mockPost);
      const findByIdAndUpdateStub = sinon.stub(Post, 'findByIdAndUpdate');
      findByIdAndUpdateStub.resolves(mockPost);
      const saveStub = sinon.stub(Post.prototype, 'save');

      // Mock request and response objects
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the likePost function
      await likePost(mockRequest, res);

      // Assertions
      expect(res.status.calledWithExactly(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      // Restore the stubs to their original state
      findByIdStub.restore();
      findByIdAndUpdateStub.restore();
      saveStub.restore();
    });

    it('should handle errors and return 404 status', async () => {
      const mockRequest = {
        params: {
          id: 'post123',
        },
        body: {
          userId: 'user123',
        },
      };

      // Stub the findById method of the Post model to simulate an error
      const findByIdStub = sinon.stub(Post, 'findById');
      findByIdStub.rejects(new Error('Post not found'));

      // Mock request and response objects
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Call the likePost function
      await likePost(mockRequest, res);

      // Assertions
      expect(res.status.calledWithExactly(404)).to.be.true;
      expect(res.json.calledWithExactly({ message: 'Post not found' })).to.be.true;

      // Restore the stub to its original state
      findByIdStub.restore();
    });
  });
});
