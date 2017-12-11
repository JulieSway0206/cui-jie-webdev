/**
 * Created by SeedofWind on 6/9/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('shelfController', shelfController);

    function shelfController (bookService,shelfService,$routeParams, $location, currentUser,userService) {

        var model = this;

        model.user = currentUser;
        model.userId = currentUser._id;
        model.shelfId = $routeParams.shelfId;
        model.updateShelf = updateShelf;
        model.deleteShelf = deleteShelf;
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
            shelfService
                .findShelfById(model.shelfId)
                .then(function (shelf) {
                    model.shelf = shelf;
                    model.preShelf = angular.copy(model.shelf);
                });
        }

        init();





        function updateShelf(shelfId, newShelf) {
            if (newShelf.name === null || newShelf.name  === '' || typeof newShelf.name === 'undefined') {
                model.error1 = 'Name is required!!';
                model.submitted1 = true;
                return;
            }

            var name = newShelf.name;

             var shelf = {
                        name: name
                       };

             shelfService
                        .updateShelf(shelfId, shelf)
                        .then(function () {
                            model.message = "Updated successfully!!";
                            $location.url('/lender/shelf/edit/'+model.shelfId);
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
                .then(function () {
                    $location.url('/lender/shelves');
                });
        }

    }
})();