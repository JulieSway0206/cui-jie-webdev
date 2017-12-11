/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .service('shelfService', shelfService);

    function shelfService($http) {
        // any other function that is not tied to 'this' is private function
        // only tied to 'this' can be publicly used outside
        this.findAllShelvesForUser = findAllShelvesForUser;
        this.findShelfById = findShelfById;
        this.deleteShelf = deleteShelf;
        this.createShelf = createShelf;
        this.updateShelf = updateShelf;
        this.findAllShelves = findAllShelves;
        this.findBookByISBN = findBookByISBN;
        this.findBookByAuthor = findBookByAuthor;
        this.findBookByName = findBookByName;
        this.updateInventory = updateInventory;
        this.adminDelete = adminDelete;
        this.adminUpdate = adminUpdate;
        this.findShelfByName = findShelfByName;






        function findShelfByName(name) {
            return $http.get("/api/dbproject/shelf?name=" + name)
                .then(function (response) {
                    return response.data;
                });
        }




        function adminUpdate(shelfId, shelf) {
            var url = "/api/dbproject/admin/shelf/" + shelfId;
            return $http.put(url, shelf)
                .then(function (response) {
                    return response.data;
                });
        }

        function adminDelete(userId) {
            var url = "/api/dbproject/admin/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateInventory(bookId, quantity) {
            var url = "/api/dbproject/book/inventory/" + bookId;
            var inv = {inventory: quantity};
            return $http.put(url, inv)
                .then(function (response) {
                    return response.data;
                });
        }



        function findBookByISBN(isbn) {
            return $http.get("/api/dbproject/isbn/book?isbn=" + isbn)
                .then(function (response) {
                    return response.data;
                });
        }

        function findBookByAuthor(author) {
            return $http.get("/api/dbproject/author/book?author=" + author)
                .then(function (response) {
                    return response.data;
                });
        }

        function findBookByName(bookName) {
            return $http.get("/api/dbproject/name/book?bookName=" + bookName)
                .then(function (response) {
                    return response.data;
                });
        }








        function findAllShelves() {
            var url = "/api/dbproject/shelves";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function updateShelf (shelfId, shelf) {
            var url = "/api/dbproject/shelf/edit/" + shelfId;
            return $http.put(url, shelf)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function createShelf(shelf, userId){
            var url = "/api/dbproject/user/"+userId+"/shelf";
            return $http
                        .post(url, shelf)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function deleteShelf(shelfId) {
            var url = "/api/dbproject/shelf/" + shelfId;
            return $http.delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findShelfById(shelfId) {
            var url = "/api/dbproject/shelf/" + shelfId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findAllShelvesForUser(userId) {
            var url = "/api/dbproject/user/"+userId+"/shelves";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function(error){
                    console.log(error); //
                });
        }
    }
})();