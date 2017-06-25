/**
 * Created by SeedofWind on 6/9/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .service('searchService', searchService);

    function searchService($http) {

        this.searchBook= searchBook;

        var urlBase = url = "https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=1&key=AIzaSyCLqXiQxl0SiQjSrxmD7ENw8Fmv9FY7xR4";


        function searchBook(searchText) {
            var url = urlBase
                .replace("harry+potter", searchText);
            return $http.get(url)


        }

    }
})();