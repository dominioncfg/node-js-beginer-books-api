//  Revealing function pattern

function booksController(Book) {
    async function get(req, res) {
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
    }

    function getById(req, res) {
        return res.json(req.book);
    }

    function post(req, res) {
        const book = new Book(req.body);
        book.save();
        return res.status(201).json(book);
    }

    function put(req, res) {
        const { book } = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        book.save();
        return res.json(book);
    }

    function patch(req, res) {
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
    }

    function deleteBook(req, res) {
        req.book.deleteOne();
        res.sendStatus(204);
    }
    return {
        get,
        getById,
        post,
        put,
        patch,
        delete: deleteBook,
    };
}

module.exports = booksController;
