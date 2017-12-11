/**
 * Created by SeedofWind on 5/25/17.
 */
(function () {
      angular
          .module('BookAppMaker')
          .controller('loginController', loginController);


      function loginController($location, userService) {

          var model = this;

          model.login = login;


          function login(username, password) {
              // var found = userService.findUserByCredentials(username, password);
              if(username && password){
              userService
              // .findUserByCredentials(username, password)
                  .login(username, password)
                  .then(login, loginError);
              function login(user) {

                  if (user) {
                      if(user.roles[0] === "BORROWER"){
                      $location.url('/profile/borrower');}
                      else if(user.roles[0] === "LENDER"){
                          $location.url('/profile/lender');

                      } else {

                          $location.url('/manage');
                      }
                  } else {
                      model.message = "Sorry, " + username + " not found. Please try again!";
                  }
              }

              function loginError() {
                  model.message = "Sorry, not found. Please try again!";
              }
          }
          }
      }
      
})();