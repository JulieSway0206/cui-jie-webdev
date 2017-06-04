/**
 * Created by SeedofWind on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@gmail.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@gmail.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@gmail.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",email: "jannunzi@gmail.com"}
        ];

    // api is an object with attribute findUserById, the value of which is findUserById that
    //     bind with the findUserById function below.
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials:  findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function updateUser (userId, user) {
            for (var v in users) {
                if (users[v]._id === userId){
                    users[v] = user;
                }
            }
        }

        function deleteUser (userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index, 1);
        }


        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            user.created = new Date();
            users.push(user);
            return user
        }

        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined'){
                return null;
            }
            return user;

        }



        function findUserById(userId) {
            var url = "/api/assignment/user/"+userId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }
        function findUserByCredentials(username, password) {
           var url = "/api/assignment/user?username="+username+"&password="+password;
           return $http.get(url)
                       .then(function (response) {
                           return response.data;
                       });

            
        }

    }

})();