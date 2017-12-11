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
        model.shelfId = $routeParams.shelfId;
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
            if (newBook.isbn === null || newBook.isbn  === '' || typeof newBook.isbn  === 'undefined') {
                model.error1 = 'ISBN is required!!';
                model.error2 = null;
                model.error3 = null;
                model.submitted1 = true;
                return;
            }

            var isbn = newBook.isbn;
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
                        .updateBook(bookId, book)
                        .then(function () {
                            model.message = "Updated successfully!!";
                            $location.url('/lender/book/'+model.shelfId+"/"+model.bookId);
                        });
                }, function (err) {
                    model.message = "Sorry, we cannot find this book!"
                });


        }

        function deleteBook(bookId) {
            bookService
                .deleteBook(model.shelfId, bookId)
                .then(function () {
                    $location.url('/lender/shelf/books/'+model.shelfId);
                });
        }

    }
})();