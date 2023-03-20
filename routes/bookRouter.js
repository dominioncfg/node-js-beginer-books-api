const express = require('express');
const booksController = require('../controllers/booksControllers');

function routes(Book) {
    const bookRouter = express.Router();
    const controller = booksController(Book);

    bookRouter
        .route('/books')
        .get(controller.get)
        .post(controller.post);

    bookRouter.use('/books/:bookId', async (req, res, next) => {
        try {
            const book = await Book.findById(req.params.bookId);
            if (book) {
                req.book = book;
                return next();
            }

            return res.sendStatus(404);
        } catch (err) {
            return res.send(err);
        }
    });
    bookRouter
        .route('/books/:bookId')
        .get(controller.getById)
        .put(controller.put)
        .patch(controller.patch)
        .delete(controller.delete);

    return bookRouter;
}

module.exports = routes;
