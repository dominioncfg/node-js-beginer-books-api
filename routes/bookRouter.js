const express = require('express');

function routes(Book) {
    const bookRouter = express.Router();
    bookRouter
        .route('/books')
        .get(async (req, res) => {
            try {
                const query = {};
                if (req.query.genre) {
                    query.genre = req.query.genre;
                }
                const books = await Book.find(query);
                return res.json(books);
            } catch (err) {
                return res.send(err);
            }
        })
        .post(async (req, res) => {
            const book = new Book(req.body);
            book.save();
            return res.status(201).json(book);
        });

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
        .get(async (req, res) => res.json(req.book))
        .put((req, res) => {
            const { book } = req;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save();
            return res.json(book);
        })
        .patch((req, res) => {
            const { book } = req;

            // eslint-disable-next-line no-underscore-dangle
            if (req.body._id) delete req.body._id;

            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const value = item[1];
                book[key] = value;
            });
            book.save();
            return res.json(book);
        })
        .delete((req, res) => {
            req.book.deleteOne();
            res.sendStatus(204);
        });

    return bookRouter;
}

module.exports = routes;
