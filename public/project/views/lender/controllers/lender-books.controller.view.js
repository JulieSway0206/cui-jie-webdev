/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('sellerBooksController', sellerBooksController);
    
    function sellerBooksController(bookService, currentUser,$location, userService,$routeParams) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.shelfId = $routeParams['shelfId'];
        model.createBook = createBook;
        model.currentUser = currentUser;
        model.logout = logout;

        function init() {
            bookService
                         .findAllBooksForShelf(model.shelfId)
                         .then(renderBooks);

        }
        init();



        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function renderBooks(books) {
            model.books = books;
        }

        function createBook(shelfId) {
            var newBook = {
                name : '',
                isbn : '',
                description: ''
            };

            bookService
                .createBook(newBook, shelfId)
                .then(function (book) {

                    var bookId = book._id;
                    $location.url('/lender/book/'+model.shelfId+"/"+bookId);
                });
        }
    }

})();