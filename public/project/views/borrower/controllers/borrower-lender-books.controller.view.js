/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('sellerBooksListController', sellerBooksListController);
    
    function sellerBooksListController(shelfService, currentUser,$location, userService,$routeParams) {
        var model = this;
        model.lenderId = $routeParams['lenderId'];
        model.userId = currentUser._id;//$routeParams['userId'];
        model.currentUser = currentUser;
        model.logout = logout;
        model.followSeller = followSeller;
        model.unfollowSeller =unfollowSeller;

        function init() {
            shelfService
                         .findAllShelvesForUser(model.lenderId)
                         .then(renderShelves);
            userService
                .findUserById(model.lenderId)
                .then(function (lender) {
                    model.lender = lender;
                    userService
                        .findFollowSellerById(model.userId,model.lender._id)
                        .then(function (user) {
                            if(user){
                                model.follow = true;

                            } else{
                                model.follow = false;

                            }
                        });

                });
        }
        init();






        function unfollowSeller(userId, lenderId) {

            userService
                .unfollowSeller(userId, lenderId)
                .then(function () {
                    init();
                });
        }





        function followSeller(userId, lenderId) {

            userService
                .followSeller(userId, lenderId)
                .then(function () {
                    init();
                });
        }



        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function renderShelves(shelves) {
            model.shelves = shelves;
        }

    }

})();