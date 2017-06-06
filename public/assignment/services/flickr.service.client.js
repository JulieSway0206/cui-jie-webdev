/**
 * Created by SeedofWind on 6/6/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('flickrService', flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "eb7c7cfaf8c964b9f37b786254be6eca";
        var secret = "8bd940690ac17434";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);

        }
    }
})();