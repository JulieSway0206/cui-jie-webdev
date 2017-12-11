/**
 * Created by SeedofWind on 6/4/17.
 */

var app = require('../../express');
var shelfModel = require('../models/lender/shelf.model.server');


app.get("/api/dbproject/user/:userId/shelves", findAllShelvesForUser);
app.post("/api/dbproject/user/:userId/shelf", createShelf);
app.get("/api/dbproject/shelf/:shelfId", findShelfById);
app.put("/api/dbproject/shelf/edit/:shelfId", updateShelf);
app.delete("/api/dbproject/shelf/:shelfId", deleteShelf);
app.get("/api/dbproject/shelves", findAllShelves);
// app.get("/api/dbproject/name/book", findBookByName);
// app.get("/api/dbproject/author/book", findBookByAuthor);
// app.get("/api/dbproject/isbn/book", findBookByISBN);
// app.put("/api/dbproject/book/inventory/:bookId", updateInventory);
// app.get("/api/dbproject/admin/user/:userId", adminDelete);
app.put("/api/dbproject/admin/shelf/:shelfId", adminUpdate);
app.get("/api/dbproject/shelf", findShelfByName);




function adminUpdate(req, res) {
    var shelfId = req.params.shelfId;
    var shelf = req.body;
    shelfModel
        .adminUpdate(shelfId, shelf)
        .then(function (status) {
            res.send(status);
        });
}

// function adminDelete(req, res) {
//     var userId = req.params.userId;
//     shelfModel
//         .adminDelete(userId)
//         .then(function (status) {
//             res.json(status);
//         });
// }
//
//
//
//
// function updateInventory(req, res) {
//     var bookId = req.params.bookId;
//     var quantity = req.body.inventory;
//     shelfModel
//         .updateInventory(bookId, quantity)
//         .then(function (status) {
//             res.send(status);
//         });
// }
//
//
function findShelfByName(req, res) {
    var name = req.query['name'];
    shelfModel
        .findShelfByName(name)
        .then(function (shelf) {
            res.json(shelf);
        });
}
//
//
// function findBookByName(req, res) {
//     var bookName = req.query['bookName'];
//     shelfModel
//         .findBookByName(bookName)
//         .then(function (books) {
//             res.json(books);
//         });
// }
//
//
// function findBookByAuthor(req, res) {
//     var author = req.query['author'];
//     console.log(33+author);
//
//     shelfModel
//         .findBookByAuthor(author)
//         .then(function (books) {
//             res.json(books);
//         });
// }
//
function findAllShelves(req, res) {
    shelfModel
        .findAllShelves()
        .then(function (shelves) {
            res.json(shelves);
        });
}



function deleteShelf(req, res) {
    var shelfId = req.params.shelfId;
    shelfModel
        .deleteShelfFromUser(shelfId)
        .then(function (status) {
            res.json(status);
        });
}

function updateShelf(req, res) {
    var shelfId = req.params.shelfId;
    var shelf = req.body;
    shelfModel
        .updateShelf(shelfId, shelf)
        .then(function (status) {
            res.send(status);
        });
}



function findShelfById(req, res) {

    var shelfId = req.params.shelfId;
    shelfModel
        .findShelfById(shelfId)
        .then(function (shelf) {
            res.json(shelf);
        });
}

function createShelf(req, res) {
    var shelf = req.body;
    var userId = req.params.userId;
    shelfModel
        .createShelfForUser(userId, shelf)
        .then(function (shelf) {
            res.json(shelf);
        });
}

function findAllShelvesForUser(req, res) {
    var results = [];
    var userId = req.params.userId;
        shelfModel
            .findAllShelvesForUser(userId)
            .then(function (shelves) {
                res.json(shelves);
            });
}



