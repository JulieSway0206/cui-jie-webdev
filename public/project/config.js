/**
 * Created by SeedofWind on 5/25/17.
 */
(function () {
      angular
          .module('BookAppMaker')
          .config(configuration);
      
      function configuration($routeProvider) {
             $routeProvider
                 .when('/', {
                       templateUrl: 'views/home/templates/home.html',
                       controller: 'mainController',
                       controllerAs: 'model',
                     resolve:{
                         currentUser: checkCurrentUser
                     }
                 })
                 .when('/lender/home', {
                     templateUrl: 'views/home/templates/seller-home.html',
                     controller: 'mainController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/borrower/home', {
                     templateUrl: 'views/home/templates/buyer-home.html',
                     controller: 'mainController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/admin/home', {
                     templateUrl: 'views/home/templates/admin-home.html',
                     controller: 'mainController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/manage', {
                     templateUrl: 'views/admin/templates/admin.view.client.html',
                     controller: 'mainController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/admin/user', {
                     templateUrl: 'views/admin/templates/admin-users.view.client.html',
                     controller: 'adminUsersController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/admin/books', {
                     templateUrl: 'views/admin/templates/admin-books.view.client.html',
                     controller: 'adminBooksController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/admin/shelves', {
                     templateUrl: 'views/admin/templates/admin-shelves.view.client.html',
                     controller: 'adminShelvesController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/admin/following', {
                     templateUrl: 'views/admin/templates/admin-following.view.client.html',
                     controller: 'adminFollowingController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/admin/orders', {
                     templateUrl: 'views/admin/templates/admin-orders.view.client.html',
                     controller: 'adminOrdersController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/home/books', {
                     templateUrl: 'views/books/templates/books.html',
                     controller: 'booksSearchController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkCurrentUser
                     }
                 })
                 .when('/books/list/lender/:lenderId', {
                     templateUrl: 'views/borrower/templates/borrower-lender-books.view.client.html',
                     controller: 'sellerBooksListController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/borrower/following', {
                     templateUrl: 'views/borrower/templates/borrower-following.view.client.html',
                     controller: 'buyerFollowingController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/borrower/books', {
                     templateUrl: 'views/borrower/templates/borrower-books.view.client.html',
                     controller: 'booksSearchController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/lender/followers', {
                     templateUrl: 'views/lender/templates/lender-followers.view.client.html',
                     controller: 'lenderFollowerController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/lender/shelves', {
                     templateUrl: 'views/lender/templates/lender-shelves.view.client.html',
                     controller: 'lenderShelfController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/lender/shelf/edit/:shelfId', {
                     templateUrl: 'views/lender/templates/shelf-edit.view.client.html',
                     controller: 'shelfController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/lender/header/books', {
                     templateUrl: 'views/lender/templates/lender-books-header.view.client.html',
                     controller: 'booksSearchController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })

                 .when('/home/books/:bookId', {
                     templateUrl: 'views/books/templates/book-info.view.client.html',
                     controller: 'bookInfoController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkCurrentUser
                     }
                 })
                 .when('/borrower/books/:bookId', {
                     templateUrl: 'views/borrower/templates/borrower-book-info.view.client.html',
                     controller: 'bookInfoController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/lender/books/:shelfId/:bookId', {
                     templateUrl: 'views/lender/templates/lender-book-info.view.client.html',
                     controller: 'bookInfoController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/operation', {
                     templateUrl: 'views/home/templates/operationhome.html',
                     controller: 'homeController',
                     controllerAs: 'model'
                 })
                 .when('/search/:text', {
                     templateUrl: 'views/home/templates/search.view.client.html',
                     controller: 'searchController',
                     controllerAs: 'model'
                 })

                 .when('/login',{
                       templateUrl: 'views/user/templates/login.view.client.html',
                       controller: 'loginController',
                       controllerAs: 'model'
                 })
                 .when('/register',{
                     templateUrl: 'views/user/templates/register.view.client.html',
                     controller: 'registerController',
                     controllerAs: 'model'
                 })

                 .when('/profile/borrower',{
                     templateUrl: 'views/borrower/templates/borrower-profile.view.client.html',
                     controller:'profileController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/profile/lender',{
                     templateUrl: 'views/lender/templates/lender-profile.view.client.html',
                     controller:'profileController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })

                 .when('/lender/shelf/books/:shelfId',{
                     templateUrl: 'views/lender/templates/lender-books.view.client.html',
                     controller:'sellerBooksController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/lender/orders',{
                     templateUrl: 'views/lender/templates/lender-orders.view.client.html',
                     controller:'sellerOrdersController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/lender/orders/message/:orderId',{
                     templateUrl: 'views/lender/templates/lender-orders-message.view.client.html',
                     controller:'sellerOrdersMessageController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/borrower/orders',{
                     templateUrl: 'views/borrower/templates/borrower-orders.view.client.html',
                     controller:'buyerOrdersController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/lender/book/:shelfId/:bookId',{
                     templateUrl: 'views/lender/templates/book-edit.view.client.html',
                     controller: 'bookEditController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })


      }
    function checkLoggedIn(userService, $q, $location) {

        var deferred = $q.defer();

        userService.checkLoggedIn()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q) {

        var deferred = $q.defer();

        userService.checkLoggedIn()
            .then(function (user) {
                if(user === '0'){
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

})();