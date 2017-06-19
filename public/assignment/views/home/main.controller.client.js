/**
 * Created by SeedofWind on 6/16/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('mainController', mainController);
    
    function mainController(currentUser, userService, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }

    }
})();