/**
 * Created by SeedofWind on 6/17/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('adminBooksController', adminBooksController);

    function adminBooksController(userService, currentUser,$location, bookService, shelfService) {
        var model = this;
        model.deleteBook = deleteBook;
        model.findAllBooks = findAllBooks;
        model.createBook = createBook;
        model.selectBook = selectBook;
        model.updateBook = updateBook;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                });
        }


        init();


        function updateBook(book) {
            bookService
                .adminUpdate(book._id, book)
                .then(findAllBooks);
        }

        function selectBook(book) {
             model.book = angular.copy(book);
         }


        function createBook(book) {
         shelfService
             .findShelfByName(book.shelf.name)
             .then(function (shelf) {
                 console.log(book);
                 bookService
                     .createBook(book, shelf._id)
                     .then(function (book) {
                         var isbn = book.isbn;
                         searchService
                             .searchBook(isbn)
                             .then(function (response) {
                                 var item = response.data.items[0].volumeInfo;
                                 var book = {
                                     name: item.title,
                                     photo: item.imageLinks.smallThumbnail,
                                     description: newBook.description,
                                     isbn: newBook.isbn,
                                     _user: model.userId,
                                     authors: item.authors[0]+item.authors[1]
                                 };
                                 bookService
                                     .updateBook(book._id, book)
                                     .then(findAllBooks);
                             }, function (err) {
                                 model.message = "Sorry, we cannot find this book!"
                             });
                     });
             });

        }

        function deleteBook(book) {
            userService
                .findUserByUsername(book._user.username)
                .then(function (user) {
                    bookService
                        .deleteBook(user._id, book._id)
                        .then(findAllBooks);
                });
        }

        function init() {
            findAllBooks();
        }

        function findAllBooks() {
            bookService
                .findAllBooks()
                .then(function (books) {
                    model.books = books;

                });
        }
    }
})();