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

                  if (username === null || username === '' || typeof username === 'undefined') {
                      model.error1 = 'Username is required!!';
                      model.error2 = null;
                      model.error3 = null;
                      model.error4 = null;
                      model.submitted1 = true;
                      return;
                  }

                  if (password === null || password === '' || typeof password === 'undefined') {
                      model.error1 = null;
                      model.error2 = 'Password is required!';
                      model.error3 = null;
                      model.error4 = null;
                      model.submitted2 = true;
                      return;
                  }
                  if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                      model.error1 = null;
                      model.error2 = null;
                      model.error3 = 'Verifying Password is required!';
                      model.error4 = null;
                      model.submitted3 = true;
                      return;
                  }
                  if (password !== password2) {
                      model.error1 = null;
                      model.error2 = null;
                      model.error3 = null;
                      model.error4 = "Passwords don't match!";
                      model.password = "";
                      model.password2 = "";
                      model.submitted2 = true;
                      model.submitted3 = true;
                      return;
                  }


                  model.error1 = null;
                  model.error2 = null;
                  model.error3 = null;
                  model.error4 = null;

                  // var found = userService.findUserByUsername(username);
                  userService.findUserByUsername(username)
                      .then(rendUser);


                  function rendUser(user) {
                      if (user) {
                          model.error1 = "Sorry, the username is already taken.";
                      } else {
                          var newUser = {
                              username: username,
                              password: password
                          };

                          userService
                              .register(newUser)
                              .then(function () {
                                  $location.url('/profile');
                              });
                      }

                  }
              }
          }
      
})();