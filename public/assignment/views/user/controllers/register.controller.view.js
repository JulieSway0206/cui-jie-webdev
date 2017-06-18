/**
 * Created by SeedofWind on 5/25/17.
 */
(function () {
      angular
          .module('WebAppMaker')
          .controller('registerController', registerController);
          function registerController($location, userService) {

              var model = this;

              model.register = register;


              function register(username, password, password2) {

                  if(username === null || username === '' || typeof password === 'undefined'){
                      model.error = 'Username is required!!';
                      return;
                  }

                  if(password !== password2 || password === null || typeof  password === "undefined"){
                      model.error = "Passwords must match!!";
                      return;
                  }


                  // var found = userService.findUserByUsername(username);
                  userService.findUserByUsername(username)
                             .then(
                                 function () {
                                     model.error = "Sorry, that username is taken.";
                                 },
                                 function () {
                                     var newUser = {
                                         username: username,
                                         password: password
                                     };
                                     return userService
                                         .register(newUser);
                                 })
                               .then(function (user) {
                                     $location.url('/profile');
                        });
             }
          }
      
})();