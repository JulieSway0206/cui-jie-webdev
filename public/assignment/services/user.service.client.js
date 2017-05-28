/**
 * Created by SeedofWind on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService() {

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
            findUserByCredentials:  findUserByCredentials
        };
        return api;

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
            for(var u in users){
                if(users[u]._id === userId)
                    return users[u];
            }
            return null;
        }
        function findUserByCredentials(username, password) {
            for (var u in users){
                var user = users[u];
                if(user.username === username &&
                    user.password === password){
                    return user;
                }
            }
            return null;

            
        }

    }

})();