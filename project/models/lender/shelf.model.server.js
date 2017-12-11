/**
 * Created by SeedofWind on 6/11/17.
 */
var mongoose = require('mongoose');
var shelfSchema = require('./shelf.schema.server');
var shelfModel = mongoose.model('ShelfModel', shelfSchema);
var userModel = require('../user/user.model.server');
var bookModel = require('./book.model.server');
var q = require('q');

//api
shelfModel.deleteBook = deleteBook;
shelfModel.createShelfForUser = createShelfForUser;
shelfModel.findAllShelvesForUser = findAllShelvesForUser;
shelfModel.deleteShelfFromUser = deleteShelfFromUser;
shelfModel.findShelfById = findShelfById;
shelfModel.updateShelf = updateShelf;
shelfModel.findAllShelves = findAllShelves;
shelfModel.findBookByAuthor = findBookByAuthor;
shelfModel.findBookByName = findBookByName;
shelfModel.updateInventory = updateInventory;
shelfModel.findBookByISBN = findBookByISBN;
shelfModel.adminDelete = adminDelete;
shelfModel.adminUpdate = adminUpdate;
shelfModel.addBook = addBook;
shelfModel.findShelfByName = findShelfByName;
module.exports = shelfModel;



function findShelfByName(name) {
    return shelfModel.findOne({name: name})
        .populate('_user')
        .exec();

}


function addBook(shelfId, bookId) {
    return shelfModel
        .findShelfById(shelfId)
        .then(function (shelf) {
            shelf.books.push(bookId);
            return shelf.save();
        });
}

function adminUpdate(shelfId, newShelf) {
    return shelfModel.findShelfById(shelfId)
                    .then(function (shelf) {
                        if(newShelf._user.username !== shelf._user.username){
                           return userModel.userShelfUpdate(newShelf._user.username, shelf._user.username, shelfId)
                               .then(function (status) {
                                   return shelfModel.update({_id: shelfId}, {$set: newShelf})
                                       .then(function (status) {
                                           return userModel.findUserByUsername(newShelf._user.username)
                                               .then(function (user) {
                                                   return shelfModel.update({_id: shelfId}, {$set: {_user:user._id}})
                                               })
                                               .then(function (user) {
                                                   return bookModel.updateBookOwner(shelfId, user._id)
                                               })
                                       });
                               });
                        } else{
                            return shelfModel.update({_id: shelfId}, {$set: newShelf});
                        }
                    });
}


function adminDelete(userId) {
    return shelfModel
        .remove({_user: userId});

}


function updateInventory(bookId, quantity) {
    return shelfModel.update({_id: bookId}, {$set: {inventory: quantity}});
}


function deleteBook(bookId) {
    return shelfModel
        .findOne({books:bookId})
        .then(function (shelf) {
            var index = shelf.books.indexOf(bookId);
            shelf.books.splice(index, 1);
            return shelf.save();
        });
}


function findBookByName(bookName) {


    var searchOptions = {
        fieldToSearch:'name',// which field you want to search
        caseSensitive: false // apply case sensitivity to your search
    };

   // return bookModel.regexSearch(bookName,searchOptions);
    var deferred = q.defer();
    shelfModel.regexSearch(bookName, searchOptions, function(err, book){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(book);
        }
    });
    return deferred.promise;

}



function findBookByAuthor(author) {

    var searchOptions = {
        fieldToSearch: 'authors', // which field you want to search
        caseSensitive: false // apply case sensitivity to your search
    };

    // return bookModel.regexSearch(bookName,searchOptions);
    var deferred = q.defer();
    shelfModel.regexSearch(author, searchOptions, function(err, book){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(book);
        }
    });
    return deferred.promise;

}

function findBookByISBN(isbn) {

    var searchOptions = {
        fieldToSearch: 'isbn', // which field you want to search
        caseSensitive: false // apply case sensitivity to your search
    };

    // return bookModel.regexSearch(bookName,searchOptions);
    var deferred = q.defer();
    shelfModel.regexSearch(isbn, searchOptions, function(err, book){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(book);
        }
    });
    return deferred.promise;

}



function updateShelf(shelfId, newshelf) {
    return shelfModel.update({_id: shelfId}, {$set: newshelf});
}

function findShelfById(shelfId) {
     return shelfModel.findById(shelfId)
                     .populate('_user')
                     .exec();

}

function deleteShelfFromUser(shelfId) {
    return shelfModel
        .remove({_id: shelfId})
        .then(function (status) {
            return userModel
                   .deleteShelf(shelfId)

        });
}


function findAllShelvesForUser(userId) {
    return shelfModel
                    .find({_user: userId})
                    .populate('_user')
                    .exec();
}





function createShelfForUser(userId, shelf) {
    shelf._user = userId;
    return shelfModel.create(shelf)
        .then(function (shelf) {
            return userModel
                .addShelf(userId, shelf._id)
                .then(function () {
                    return shelf;
                });
        });
}




function findAllShelves() {
 return shelfModel.find()
        .populate('_user')
        .exec();
}

