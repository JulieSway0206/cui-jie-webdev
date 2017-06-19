/**
 * Created by SeedofWind on 6/6/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, flickrService, widgetService, $location, currentUser) {
        var model = this;
        model.searchPhotos = searchPhotos;
        model.selectPhoto =selectPhoto;
        model.userId = currentUser._id;//$routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                    console.log(model.widget.name);
                });
        }
        init();

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widget =  {'_id': model.widgetId,
                'name': model.widget.name,
                'text': model.widget.text,
                'url': url,
                'widgetType': 'IMAGE',
                'pageId': model.pageId,
                'width': model.widget.width};
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function (){
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + model.widgetId);
                });
        }

        function searchPhotos(searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }
    }
})();