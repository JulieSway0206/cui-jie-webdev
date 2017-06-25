/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('sellerOrdersController', sellerOrdersController);
    
    function sellerOrdersController(bookService, currentUser,$location, userService, orderService) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.currentUser = currentUser;
        model.logout = logout;
        model.acceptOrder = acceptOrder;
        model.deleteOrder = deleteOrder;

        function init() {
            orderService
                         .findAllOrdersForUser(model.userId)
                         .then(renderOrders);

        }
        init();





        
        function deleteOrder(orderId, borderId) {
            orderService
                .deleteOrder(orderId)
                .then(function () {
                    orderService
                        .updateBOrder(borderId)
                        .then(function (status) {
                            $location.url('/seller/orders');
                            console.log(7);
                        })
                });
        }
        
        
        
        
        function acceptOrder(orderId, quantity, bookId, borderId) {
           bookService
               .findBookById(bookId)
               .then(function (book) {
                   if(book.inventory < quantity){
                       model.message = "Sorry, upload more books on your inventory!!"
                   } else {
                       var number = book.inventory - quantity;
                       bookService
                           .updateInventory(bookId, number)
                           .then(function () {
                               orderService
                                   .acceptOrder(orderId, borderId)
                                   .then(function () {
                                      $location.url('/seller/orders');

                                   });

                           });
                   }

                   });
        }



        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function renderOrders(orders) {
            model.orders = orders;
        }

        function createBook(userId) {
            var newBook = {
                name : '',
                isbn : '',
                description: ''
            };
            bookService
                .createBook(newBook, userId)
                .then(function (book) {
                    console.log(book);
                    var bookId = book._id;

                    $location.url('/seller/book/'+bookId);
                });
        }
    }

})();