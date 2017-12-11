/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('lenderShelfController', lenderShelfController);
    
    function lenderShelfController(bookService, currentUser,$location, userService, shelfService) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.createShelf = createShelf;
        model.currentUser = currentUser;
        model.logout = logout;

        function init() {
            shelfService
                         .findAllShelvesForUser(model.userId)
                         .then(renderShelves);

        }
        init();



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

        function createShelf(userId) {
            var newShelf = {
                name : ''
            };
            shelfService
                .createShelf(newShelf, userId)
                .then(function (shelf) {

                    var shelfId = shelf._id;

                    $location.url('/lender/shelf/edit/'+shelfId);
                });
        }
    }

})();