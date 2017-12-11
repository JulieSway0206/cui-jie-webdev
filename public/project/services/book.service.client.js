/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .service('bookService', bookService);

    function bookService($http) {
        // any other function that is not tied to 'this' is private function
        // only tied to 'this' can be publicly used outside
        this.findAllBooksForShelf = findAllBooksForShelf;
        this.findBookById = findBookById;
        this.deleteBook = deleteBook;
        this.createBook = createBook;
        this.updateBook = updateBook;
        this.findAllBooks = findAllBooks;
        this.findBookByISBN = findBookByISBN;
        this.findBookByAuthor = findBookByAuthor;
        this.findBookByName = findBookByName;
        this.updateInventory = updateInventory;
        this.adminDelete = adminDelete;
        this.adminUpdate = adminUpdate;
        this.updateBookOwner = updateBookOwner;








        function updateBookOwner(bookId, userId) {
            var url = "/api/dbproject/admin/update/owner/" + bookId;
            return $http.put(url, userId)
                .then(function (response) {
                    return response.data;
                });
        }


        function adminUpdate(bookId, book) {
            var url = "/api/dbproject/admin/book/" + bookId;
            return $http.put(url, book)
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








        function findAllBooks() {
            var url = "/api/dbproject/books";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function updateBook (bookId, book) {
            var url = "/api/dbproject/book/" + bookId;
            return $http.put(url, book)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function createBook(book, shelfId){
            var url = "/api/dbproject/user/"+shelfId+"/book";
            return $http
                        .post(url, book)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function deleteBook(shelfId, bookId) {
            var url = "/api/dbproject/book/" + shelfId +"/" + bookId;
            return $http.delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findBookById(bookId) {
            var url = " /api/dbproject/book/" + bookId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findAllBooksForShelf(shelfId) {
            var url = "/api/dbproject/user/"+shelfId+"/book";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();