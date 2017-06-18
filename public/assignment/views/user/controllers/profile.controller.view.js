/**
 * Created by SeedofWind on 5/25/17.
 */
(function () {
      angular
          .module('WebAppMaker')
          .controller('profileController', profileController);

      function profileController(currentUser, $location, $routeParams, userService) {

              var model = this;

              model.userId = currentUser._id;//$routeParams['userId'];
              model.user = currentUser;

              // model.updateUser = updateUser;
              modeldeleteUser = deleteUser;
              model.logout = logout;
              model.unregister = unregister;


              // model.user = userService.findUserById(model.userId);
              // userService.findUserById(model.userId)
              //            .then(renderUser, userError);

              // function init() {
              //     renderUser(currentUser);
              // }
              //
              // init();

              // function renderUser(user) {
              // model.user = user;
              // }

              

          function unregister() {
              userService
                  .unregister()
                  .then(function () {
                      $location.url('/');
                  });
          }

          function logout() {
                   userService
                       .logout()
                       .then(function () {
                          $location.url('/login')
                       });
               }
          
          
              function userError(error) {
                  model.error = "User not found";
              }

              model.updateUser = updateUser;
              model.deleteUser = deleteUser;



          function updateUser (userId, user) {
              userService.updateUser(userId, user)
                         .then(function () {
                             model.message = "User update was successful!!";
                         });
          }

          function deleteUser (userId) {
              userService.deleteUser(userId)
                         .then(function () {
                             $location.url('/login');
                         }, function () {
                             model.error = "Unable to delete you!";
                         });
          }

          }
      
})();