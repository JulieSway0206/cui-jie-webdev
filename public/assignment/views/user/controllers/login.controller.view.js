/**
 * Created by SeedofWind on 5/25/17.
 */
(function () {
      angular
          .module('WebAppMaker')
          .controller('loginController', loginController);


      function loginController($location, userService) {

          var model = this;

          model.login = login;


          function login(username, password) {
              // var found = userService.findUserByCredentials(username, password);
              userService
                  .findUserByCredentials(username, password)
                  .then(login, loginError);
              function login(found) {
                  if (found) {
                      $location.url('/user/' + found._id);
                  } else {
                      model.message = "Sorry, " + username + " not found. Please try again!";
                  }
              }

              function loginError() {
                  model.message = "Sorry, not found. Please try again!";
              }

          }
      }
      
})();