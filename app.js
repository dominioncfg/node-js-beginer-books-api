const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');

const app = express();

if (process.env.ENV === 'Test') {
    const db = mongoose.connect('mongodb://root:example@localhost:27017/');
} else {
    const db = mongoose.connect('mongodb://root:example@localhost:27017/');
}

const bookRouter = require('./routes/bookRouter')(Book);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);
app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

module.exports = app;
