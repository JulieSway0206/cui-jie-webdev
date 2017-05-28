/**
 * Created by SeedofWind on 5/25/17.
 */
(function () {
      angular
          .module('WebAppMaker')
          .controller('profileController', profileController);

      function profileController($location, $routeParams, userService) {

              var model = this;

              model.userId = $routeParams['userId'];

              model.user = userService.findUserById(model.userId);

              model.updateUser = updateUser;
              model.deleteUser = deleteUser;



          function updateUser (userId, user) {
              userService.updateUser(userId, user);
              model.message = "Updated!!";
          }

          function deleteUser (userId) {
              userService.deleteUser(userId);
              $location.url('/login');
          }

          }
      
})();