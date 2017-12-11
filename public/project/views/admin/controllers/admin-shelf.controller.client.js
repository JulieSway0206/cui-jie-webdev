/**
 * Created by SeedofWind on 6/17/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('adminShelvesController', adminShelvesController);

    function adminShelvesController(userService, currentUser,$location, bookService, shelfService) {
        var model = this;
        model.deleteShelf = deleteShelf;
        model.findAllShelves = findAllShelves;
        model.createShelf = createShelf;
        model.selectShelf = selectShelf;
        model.updateShelf = updateShelf;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                });
        }


        init();


        function updateShelf(shelf) {
            shelfService
                .adminUpdate(shelf._id, shelf)
                .then(findAllShelves);
        }

        function selectShelf(shelf) {
             model.shelf = angular.copy(shelf);
         }


        function createShelf(shelf) {
            userService
                .findUserByUsername(shelf._user.username)
                .then(function (user) {
                    shelfService
                        .createShelf(shelf, user._id)
                        .then(findAllShelves);
                });
        }


        function deleteShelf(shelfId) {

            bookService
                .findAllBooksForShelf(shelfId)
                .then(function (books) {
                    for(var i=0; i<books.length; i++){
                        bookService
                            .deleteBook(shelfId, books[i]._id);
                    }
                });


            shelfService
                .deleteShelf(shelfId)
                .then(findAllShelves);
        }


        function init() {
            findAllShelves();
        }

        function findAllShelves() {
            shelfService
                .findAllShelves()
                .then(function (shelves) {
                    model.shelves = shelves;

                });
        }
    }
})();