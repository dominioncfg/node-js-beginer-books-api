const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const app = express();
const db = mongoose.connect('mongodb://root:example@localhost:27017/');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

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
    });

bookRouter
    .route('/books/:bookId')
    .get(async (req, res) => {
        try {
            const books = await Book.findById(req.params.bookId);
            return res.json(books);
        } catch (err) {
            return res.send(err);
        }
    });

app.use('/api', bookRouter);
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
