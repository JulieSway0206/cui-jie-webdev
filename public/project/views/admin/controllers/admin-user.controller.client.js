/**
 * Created by SeedofWind on 6/17/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService) {
        var model = this;
        model.deleteUser = deleteUser;
        model.findAllUsers = findAllUsers;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        init();


        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function selectUser(user) {
             model.user = angular.copy(user);
         }


        function createUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers);
        }

        function deleteUser(user) {
           userService
               .deleteUser(user._id)
               .then(findAllUsers);
        }

        function init() {
            findAllUsers();
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;

                });
        }
    }
})();