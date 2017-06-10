/**
 * Created by SeedofWind on 6/9/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('searchController', searchController);

    function searchController ($routeParams, searchService, $location) {

        var model = this;

        model.text = $routeParams['text'];
        model.searchBook = searchBook;
        model.handleResponse = handleResponse;
        model.toBook = toBook;

        function init() {
            searchBook(model.text);
        }
        init();

        function searchBook(searchText) {
            searchService
                .searchBook(searchText)
                .then(handleResponse);
        }

        function handleResponse(response) {
            model.items = [];

            for (var i = 0; i < response.data.items.length; i++) {
                var item = response.data.items[i];
                model.items.push(item.volumeInfo);
            }

        }

        function toBook(item) {

            for(var i = 0; i<item.length; i++) {
                if (item[i].type === 'ISBN_13') {
                    var isbn = item.identifier;
                }
            }
            $location.url('/search/'+model.text+'/'+isbn);

        }

    }
})();