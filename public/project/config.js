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
                       controller: 'homeController',
                       controllerAs: 'model'
                 })
                 .when('/seller/home', {
                     templateUrl: 'views/home/templates/seller-home.html',
                     controller: 'mainController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/buyer/home', {
                     templateUrl: 'views/home/templates/buyer-home.html',
                     controller: 'mainController',
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
                 .when('/buyer/books', {
                     templateUrl: 'views/buyer/templates/buyer-books.view.client.html',
                     controller: 'booksSearchController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/seller/header/books', {
                     templateUrl: 'views/seller/templates/seller-books-header.view.client.html',
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
                 .when('/buyer/books/:bookId', {
                     templateUrl: 'views/buyer/templates/buyer-book-info.view.client.html',
                     controller: 'bookInfoController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/seller/books/:bookId', {
                     templateUrl: 'views/seller/templates/seller-book-info.view.client.html',
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
                 .when('/profile/buyer',{
                     templateUrl: 'views/buyer/templates/buyer-profile.view.client.html',
                     controller:'profileController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/profile/seller',{
                     templateUrl: 'views/seller/templates/seller-profile.view.client.html',
                     controller:'profileController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/buyer/following',{
                     templateUrl: 'views/buyer/templates/buyer-following.view.client.html',
                     // controller:'websiteListController',
                     // controllerAs: 'model'
                 })
                 .when('/seller/books',{
                     templateUrl: 'views/seller/templates/seller-books.view.client.html',
                     controller:'sellerBooksController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/seller/orders',{
                     templateUrl: 'views/seller/templates/seller-orders.view.client.html',
                     controller:'sellerOrdersController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/buyer/orders',{
                     templateUrl: 'views/buyer/templates/buyer-orders.view.client.html',
                     controller:'buyerOrdersController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/seller/book/:bookId',{
                     templateUrl: 'views/seller/templates/book-edit.view.client.html',
                     controller: 'bookEditController',
                     controllerAs: 'model',
                     resolve:{
                         currentUser: checkLoggedIn
                     }
                 })
                 .when('/user/:userId/website/new',{
                     templateUrl: 'views/website/templates/website-new.view.client.html',
                     controller:'websiteNewController',
                     controllerAs: 'model'
                 })
                 .when('/user/:userId/website/:websiteId',{
                     templateUrl: 'views/website/templates/website-edit.view.client.html',
                     controller:'websiteEditController',
                     controllerAs: 'model'
                 })
                 .when('/user/:userId/website/:websiteId/page/new',{
                     templateUrl: 'views/page/templates/page-new.view.client.html',
                     controller:'pageNewController',
                     controllerAs: 'model'
                 })
                 .when('/user/:userId/website/:websiteId/page/:pageId',{
                 templateUrl: 'views/page/templates/page-edit.view.client.html',
                 controller:'pageEditController',
                 controllerAs: 'model'
             })
                 .when('/user/:userId/website/:websiteId/page',{
                     templateUrl: 'views/page/templates/page-list.view.client.html',
                     controller:'pageListController',
                     controllerAs: 'model'
                 })
                 .when('/user/:userId/website/:websiteId/page/:pageId/widget',{
                     templateUrl: 'views/widget/templates/widget-list.view.client.html',
                     controller:'widgetListController',
                     controllerAs: 'model'
                 })
                 .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
                     templateUrl: 'views/widget/templates/widget-choose.view.client.html',
                     controller: 'widgetNewController',
                     controllerAs: 'model'
                 })
                 .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', {
                     templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                     controller: 'widgetEditController',
                     controllerAs: 'model'
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