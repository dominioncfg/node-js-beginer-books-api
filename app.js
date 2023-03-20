const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://root:example@localhost:27017/');
const bookRouter = require('./routes/bookRouter')(Book);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
