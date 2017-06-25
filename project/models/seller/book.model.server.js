/**
 * Created by SeedofWind on 6/11/17.
 */
var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('BookModel', bookSchema);
var userModel = require('../user/user.model.server');
var q = require('q');

//api
bookModel.findAllBooks = findAllBooks;
bookModel.createBookForUser = createBookForUser;
bookModel.findAllBooksForUser = findAllBooksForUser;
bookModel.deleteBookFromUser = deleteBookFromUser;
bookModel.findBookById = findBookById;
bookModel.updateBook = updateBook;
bookModel.findAllBooks = findAllBooks;
bookModel.findBookByAuthor = findBookByAuthor;
bookModel.findBookByName = findBookByName;
bookModel.updateInventory = updateInventory;
bookModel.findBookByISBN = findBookByISBN;

module.exports = bookModel;



function updateInventory(bookId, quantity) {
    return bookModel.update({_id: bookId}, {$set: {inventory: quantity}});
}


function findBookByName(bookName) {


    var searchOptions = {
        fieldToSearch:'name',// which field you want to search
        caseSensitive: false // apply case sensitivity to your search
    };

   // return bookModel.regexSearch(bookName,searchOptions);
    var deferred = q.defer();
    bookModel.regexSearch(bookName, searchOptions, function(err, book){
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
    bookModel.regexSearch(author, searchOptions, function(err, book){
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
    bookModel.regexSearch(isbn, searchOptions, function(err, book){
        if(err) {
            deferred.reject(err);
        } else {
            deferred.resolve(book);
        }
    });
    return deferred.promise;

}



function updateBook(bookId, newbook) {
    return bookModel.update({_id: bookId}, {$set: newbook});
}

function findBookById(bookId) {
     return bookModel.findById(bookId)
                     .populate('_user')
                     .exec();

}

function deleteBookFromUser(bookId) {
    return bookModel
        .remove({_id: bookId})
        .then(function (status) {
            return userModel
                   .deleteBook(bookId);
        });
}


function findAllBooksForUser(userId) {
    return bookModel
                    .find({_user: userId})
                    .populate('_user')
                    .exec();
}





function createBookForUser(userId, book) {
    book._user = userId;
    return bookModel.create(book)
        .then(function (book) {
            return userModel
                .addBook(userId, book._id)
                .then(function () {
                    return book;
                });
        });
}




function findAllBooks() {
 return bookModel.find()
        .populate('_user')
        .exec();
}
