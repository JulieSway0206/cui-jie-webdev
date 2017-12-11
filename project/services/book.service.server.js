/**
 * Created by SeedofWind on 6/4/17.
 */

var app = require('../../express');
var bookModel = require('../models/lender/book.model.server');


app.get("/api/dbproject/user/:shelfId/book", findAllBooksForShelf);
app.post("/api/dbproject/user/:shelfId/book", createBook);
app.get("/api/dbproject/book/:bookId", findBookById);
app.put("/api/dbproject/book/:bookId", updateBook);
app.delete("/api/dbproject/book/:shelfId/:bookId", deleteBook);
app.get("/api/dbproject/books", findAllBooks);
app.get("/api/dbproject/name/book", findBookByName);
app.get("/api/dbproject/author/book", findBookByAuthor);
app.get("/api/dbproject/isbn/book", findBookByISBN);
app.put("/api/dbproject/book/inventory/:bookId", updateInventory);
app.get("/api/dbproject/admin/user/:userId", adminDelete);
app.put("/api/dbproject/admin/book/:bookId", adminUpdate);
app.put("/api/dbproject/admin/update/owner/:bookId", updateBookOwner);



function updateBookOwner(req, res){
    var bookId = req.params.bookId;
    var userId = req.body;
    bookModel
        .updateBookOwner(bookId, userId)
        .then(function (status) {
            res.send(status);
        });
}

function adminUpdate(req, res) {
    var bookId = req.params.bookId;
    var book = req.body;
    bookModel
        .adminUpdate(bookId, book)
        .then(function (status) {
            res.send(status);
        });
}

function adminDelete(req, res) {
    var userId = req.params.userId;
    bookModel
        .adminDelete(userId)
        .then(function (status) {
            res.json(status);
        });
}




function updateInventory(req, res) {
    var bookId = req.params.bookId;
    var quantity = req.body.inventory;
    bookModel
        .updateInventory(bookId, quantity)
        .then(function (status) {
            res.send(status);
        });
}


function findBookByISBN(req, res) {
    var isbn = req.query['isbn'];
    bookModel
        .findBookByISBN(isbn)
        .then(function (books) {
            res.json(books);
        });
}


function findBookByName(req, res) {
    var bookName = req.query['bookName'];
    bookModel
        .findBookByName(bookName)
        .then(function (books) {
            res.json(books);
        });
}


function findBookByAuthor(req, res) {
    var author = req.query['author'];
    console.log(33+author);

    bookModel
        .findBookByAuthor(author)
        .then(function (books) {
            res.json(books);
        });
}

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
        .deleteBookFromShelf(bookId)
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
    var shelfId = req.params.shelfId;
    bookModel
        .createBookForShelf(shelfId, book)
        .then(function (book) {
            res.json(book);
        });
}

function findAllBooksForShelf(req, res) {
    var results = [];
    var shelfId = req.params.shelfId;
        bookModel
            .findAllBooksForShelf(shelfId)
            .then(function (books) {
                res.json(books);
            });
}



