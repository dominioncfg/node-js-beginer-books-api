require('should');
const request = require('supertest');
const { afterEach } = require('mocha');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app');

const Book = mongoose.model('Book', {});
const agent = request.agent(app);

describe('Book Crud Test', () => {
    it('should allow a book to be posted and return read and _id', () => {
        const bookPost = { title: 'My Book', author: 'Me', genre: 'Fantasy' };

        agent.post('api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                console.log(err);
                results.body.read.should.not.equal('false');
                results.body.should.have.property('_id');
            });

        afterEach((done) => {
            Book.deleteMany({}).exec();
            done();
        });

        after((done) => {
            mongoose.connection.close();
            app.server.close(done);
        });
    });
});
