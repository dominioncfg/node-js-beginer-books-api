require('should');
const sinon = require('sinon');
const booksController = require('../controllers/booksControllers');

describe('Book Controller Tests:', () => {
    describe('Post', () => {
        it('should not allow an empty title on post', () => {
            const Book = function (book) {
                this.save = () => { };
            };

            const req = { body: { author: 'Jon' } };
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy(),
            };

            const constroller = booksController(Book);
            constroller.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status');
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});
