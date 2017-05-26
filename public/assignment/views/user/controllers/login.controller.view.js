/**
 * Created by SeedofWind on 5/25/17.
 */
(function () {
      angular
          .module('WebAppMaker')
          .controller('loginController', loginController);
          function loginController($scope) {

              var model = this;
              var users = [
                     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
             ];

              model.login = login;


              function login(username, password) {
                  var found = false;
                  for (var u in users){
                     var user = users[u];
                     if(user.username === username &&
                        user.password === password){
                         found = true;
                         break;
                     }
                 }
                 if(found){
                     model.message = "Welcome " + username;

                 } else {
                    model.message = "Sorry, " + username + " not found. Please try again!";
                 }
             }
          }
      
})();