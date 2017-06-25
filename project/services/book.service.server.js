/**
 * Created by SeedofWind on 6/4/17.
 */

var app = require('../../express');
var bookModel = require('../models/seller/book.model.server');


app.get("/api/project/user/:userId/book", findAllBooksForUser);
app.post("/api/project/user/:userId/book", createBook);
app.get("/api/project/book/:bookId", findBookById);
app.put("/api/project/book/:bookId", updateBook);
app.delete("/api/project/book/:bookId", deleteBook);
app.get("/api/project/books", findAllBooks);
// app.get("/api/project/book",findAllBookWithKeyword);
app.get("/api/project/book", findBookByName);
app.put("/api/project/book/inventory/:bookId", updateInventory);



function updateInventory(req, res) {
    var bookId = req.params.bookId;
    var quantity = req.body.inventory;
    bookModel
        .updateInventory(bookId, quantity)
        .then(function (status) {
            res.send(status);
        });
}


function findBookByName(req, res) {
    var bookName = req.query['bookName'];
    bookModel
        .findBookByName(bookName)
        .then(function (books) {
            console.log(books);
            res.json(books);
        });
}


// function findAllBookWithKeyword(req, res) {
//     var keyword = req.query['searchText'];
//     console.log(keyword);
//     bookModel
//         .findAllBookWithKeyword(keyword)
//         .then(function (books) {
//             res.json(books);
//         });
// }

function findAllBooks(req, res) {
    bookModel
        .findAllBooks()
        .then(function (books) {
            res.json(books);
        });
}



function deleteBook(req, res) {
    var bookId = req.params.bookId;
    bookModel
        .deleteBookFromUser(bookId)
        .then(function (status) {
            res.json(status);
        });
}

function updateBook(req, res) {
    var bookId = req.params.bookId;
    var book = req.body;
    bookModel
        .updateBook(bookId, book)
        .then(function (status) {
            res.send(status);
        });
}



function findBookById(req, res) {

    var bookId = req.params.bookId;
    bookModel
        .findBookById(bookId)
        .then(function (book) {
            res.json(book);
        });
}

function createBook(req, res) {
    var book = req.body;
    var userId = req.params.userId;
    bookModel
        .createBookForUser(userId, book)
        .then(function (book) {
            res.json(book);
        });
}

function findAllBooksForUser(req, res) {
    var results = [];
    var userId = req.params.userId;
        bookModel
            .findAllBooksForUser(userId)
            .then(function (books) {
                res.json(books);
            });
}



