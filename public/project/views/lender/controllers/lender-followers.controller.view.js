/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('lenderFollowerController', lenderFollowerController);

    function lenderFollowerController(bookService, currentUser,$location, userService, orderService) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.currentUser = currentUser;
        model.logout = logout;
        model.init = init;

        function init() {

            userService
                         .findUserById(model.userId)
                         .then(renderFollowing);

        }
        init();






        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function renderFollowing(user) {
            model.following = user.followers;

            for(var f = 0; f<model.following.length; f++){
                model.sellers = [];
                userService
                    .findUserById(model.following[f])
                    .then(function (seller) {

                        model.sellers.push(seller);

                    });
            }
        }

    }

})();