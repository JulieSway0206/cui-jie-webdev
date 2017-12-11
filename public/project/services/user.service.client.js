 /**
 * Created by SeedofWind on 5/26/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .factory('userService', userService);

    function userService($http) {


    // api is an object with attribute findUserById, the value of which is findUserById that
    //     bind with the findUserById function below.
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials:  findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
            checkAdmin: checkAdmin,
            findAllUsers: findAllUsers,
            unregister: unregister,
            updateBook: updateBook,
            findFollowSellerById: findFollowSellerById,
            followSeller: followSeller,
            unfollowSeller: unfollowSeller,
            findBuyer: findBuyer,
            findBuyerForOrderAdmin: findBuyerForOrderAdmin,
            findSellerForOrderAdmin: findSellerForOrderAdmin
        };
        return api;




        function findSellerForOrderAdmin(userId) {
            var url = "/api/dbproject/admin/lender/order/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findBuyerForOrderAdmin(userId) {
            var url = "/api/dbproject/admin/order/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findBuyer(userId) {
           var url = "/api/dbproject/admin/borrower/user/"+userId;
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }


        function unfollowSeller(userId, sellerId) {
            var url = "/api/dbproject/unfollowseller/user/"+userId;
            var followId = {sellerId: sellerId};
            return $http.put(url, followId)
                .then(function (response) {
                    return response.data;
                });
        }


        function followSeller(userId, sellerId) {
            var url = "/api/dbproject/followseller/user/"+userId;
            var followId = {sellerId: sellerId};
            return $http.put(url, followId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findFollowSellerById(userId,sellerId) {
            var url = "/api/dbproject/follow/user/"+userId;
            var followId = {sellerId: sellerId};
            return $http.post(url, followId)
                .then(function (response) {
                    return response.data;
                });
        }




        function updateBook(userId, newBook) {
            var url = "/api/dbproject/user/"+userId+newBook;
            return $http.put(url, newBook)
                .then(function (response) {
                    return response.data;
                });
        }





        function unregister() {
            var url = "/api/dbproject/unregister";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findAllUsers() {
            var url = "/api/dbproject/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


        }


        function checkAdmin() {
            var url = "/api/dbproject/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function register(userObj) {
            var url = "/api/dbproject/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }
        
        
        function logout() {
            var url = "/api/dbproject/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });

        }





        function checkLoggedIn() {
            var url = "/api/dbproject/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function login(username, password) {
            var url = "/api/dbproject/login";
            var credentials = {
                username: username,
                password: password
            };

            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });

        }
        
        
        function updateUser (userId, user) {
            var url = "/api/dbproject/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser (userId) {
            var url = "/api/dbproject/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createUser(user) {
            var url = "/api/dbproject/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/dbproject/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


        }



        function findUserById(userId) {
            var url = "/api/dbproject/user/"+userId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }
        function findUserByCredentials(username, password) {
           var url = "/api/dbproject/user?username="+username+"&password="+password;
           return $http.get(url)
                       .then(function (response) {
                           return response.data;
                       });

            
        }

    }

})();