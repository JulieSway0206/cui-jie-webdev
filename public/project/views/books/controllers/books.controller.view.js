/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('booksSearchController', booksSearchController);
    
    function booksSearchController(bookService,$location, userService, currentUser) {
        var model = this;

        // model.userId = currentUser._id;//$routeParams['userId'];
        model.findAllBooks = findAllBooks;
        model.currentUser = currentUser;
        model.renderBooks = renderBooks;
        model.searchBook = searchBook;
        model.logout = logout;


        function init() {
            findAllBooks();
        }

        init();







        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function findAllBooks() {
            bookService
                .findAllBooks()
                .then(renderBooks);
        }

        function renderBooks(books) {
            model.books = books;
        }

        function searchBook(type, searchText) {
            model.books = [];

            if (searchText === "") {
                bookService
                    .findAllBooks()
                    .then(function (books) {
                        model.books = books;
                    }, function (err) {
                       model.message = "Sorry, No books"
                    });
            }

            switch (type) {
                case "Search By":
                    bookService
                        .findAllBookWithKeyword(searchText)
                        .then(function (books) {
                            model.books = books;
                        }, function (err) {
                            model.message = "Sorry, no books match your search!"
                        });
                    break;
                case "Name":
                    bookService
                        .findBookByName(searchText)
                        .then(function (books) {
                            model.books = books;
                        }, function (err) {
                            model.message = "Sorry, no books match your search!"
                        });
                    break;
                case "Author":
                    bookService
                        .findBookByAuthor(searchText)
                        .then(function (books) {
                            model.books = books;
                        }, function (err) {
                            model.message = "Sorry, no books match your search!"
                        });
                    break;
                case "ISBN":
                    bookService
                        .findBookByISBN(searchText)
                        .then(function (books) {
                            model.books = books;
                        }, function (err) {
                            model.message = "Sorry, no books match your search!"
                        });
                    break;
                default:
                    break;
            }
        }
    }


})();