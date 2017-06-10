/**
 * Created by SeedofWind on 6/9/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .service('bookService', bookService);

    function bookService($http) {

        this.bookInfo= bookInfo;

        var urlBase = "https://play.google.com/store/books/details?id=tcSMCwAAQBAJ&source=gbs_api";


        function bookInfo(id) {
            var url = urlBase
                .replace("tcSMCwAAQBAJ", id);
            return $http.get(url)

        }

    }
})();