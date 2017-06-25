/**
 * Created by SeedofWind on 6/9/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('bookEditController', bookEditController);

    function bookEditController (bookService,searchService,$routeParams, $location, currentUser,userService) {

        var model = this;

        model.user = currentUser;
        model.userId = currentUser._id;
        model.bookId = $routeParams.bookId;
        model.updateBook = updateBook;
        model.deleteBook = deleteBook;
        model.currentUser = currentUser;
        model.logout = logout;


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function init() {
            bookService
                .findBookById(model.bookId)
                .then(function (book) {
                    model.book = book;
                    model.preBook = angular.copy(model.book);
                });
        }

        init();





        function updateBook(bookId, newBook) {
            var isbn = newBook.isbn;
            searchService
                .searchBook(isbn)
                .then(function (response) {
                    var item = response.data.items[0].volumeInfo;
                    var book = {
                        name: item.title,
                        photo: item.imageLinks.smallThumbnail,
                        inventory: newBook.inventory,
                        description: newBook.description,
                        isbn: newBook.isbn,
                        price: newBook.price,
                        _user: model.userId
                    };
                    bookService
                        .updateBook(bookId, book)
                        .then(function () {
                            model.message = "Updated successfully!!";
                            $location.url('/seller/book/'+model.bookId);
                        });
                }, function (err) {
                    model.message = "Sorry, we cannot find this book!"
                });


        }

        function deleteBook(bookId) {
            bookService
                .deleteBook(model.userId, bookId)
                .then(function () {
                    $location.url('/seller/books');
                });
        }

    }
})();