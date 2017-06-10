/**
 * Created by SeedofWind on 6/9/17.
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('bookController', bookController);

    function bookController ($routeParams, bookService) {

        var model = this;

        model.id = $routeParams['id'];
        model.bookInfo = bookInfo;
        model.handleResponse = handleResponse;


        function init() {
            bookInfo(model.id);
        }
        init();

        function bookInfo(bookText) {
            bookService
                .bookInfo(bookText)
                .then(handleResponse);
        }

        function handleResponse(response) {
            // model.items = [];
            //
            // for (var i = 0; i < response.data.items.length; i++) {
            //     var item = response.data.items[i];
            //     model.items.push(item.volumeInfo);
            // }
            console.log(response.data);

        }
    }
})();