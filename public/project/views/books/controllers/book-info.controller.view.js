/**
 * Created by SeedofWind on 6/23/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('bookInfoController', bookInfoController);

    function bookInfoController ($routeParams, bookService, $location, searchService,currentUser, userService,orderService) {

        var model = this;

        model.bookId = $routeParams['bookId'];
        model.searchBook = searchBook;
        model.googleBook = googleBook;
        model.currentUser = currentUser;
        model.logout = logout;
        model.userId = currentUser._id;
        model.createOrder = createOrder;


        function init() {
            searchBook(model.bookId);
        }
        init();








        function createOrder(order, userId, bookId) {

            if (order.email === null || order.email === '' || typeof order.email === 'undefined') {
                model.error1 = null;
                model.error2 = "Email is required!";
                model.submitted2 = true;
                return;
            }

             bookService
                     .findBookById(bookId)
                     .then(function (book) {
                         buyerCreate(book);
                     });

        function buyerCreate(book) {
            var newOrder = {
                email: order.email,
                message: order.message,
                name: book.name,
                lender: book._user.username,
                photo: book.photo,
                bookId:book._id
            };
            orderService
                .createOrder(newOrder, userId)
                .then(function (buyerOder) {
                    var newOrder = {
                        email: order.email,
                        message: order.message,
                        name: book.name,
                        borrower: currentUser.username,
                        photo: book.photo,
                        bookId: book._id,
                        borderId: buyerOder._id
                    };
                    orderService
                        .createOrder(newOrder,book._user._id)
                        .then(function (sellerOrder) {
                            model.message = "Your buying request sent successfully!!";
                            // $location.url('/borrower/books/'+bookId);
                            orderService
                                .updateBuyerOrder(buyerOder._id,sellerOrder._id)
                                .then(function (status) {
                                    $location.url('/borrower/books/'+bookId);
                                });
                        });

                });
        }}


        
        
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }

        function searchBook(bookId) {
            bookService
                .findBookById(bookId)
                .then(function (book) {
                    model.book = book;
                    var isbn = model.book.isbn;
                    model.googleBook(isbn);
                });
        }
        function googleBook(isbn) {
            searchService
                .searchBook(isbn)
                .then(function (response) {
                    model.item = response.data.items[0].volumeInfo;});
        }



    }
})();