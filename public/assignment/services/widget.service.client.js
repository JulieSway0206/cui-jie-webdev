/**
 * Created by SeedofWind on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);

    function widgetService($http, $routeParams) {
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;
        this.sortWidget = sortWidget;



        function sortWidget(start, end) {
            var url = "/page/"+ $routeParams.pageId + "/widget?start=" + start + "&end=" + end;
            $http.put(url);
        }



        function updateWidget (widgetId, widget) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http
                       .put(url, widget)
                       .then(function (response) {
                           return response.data;
                       });
        }


        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http
                        .delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/"+widgetId;
            return $http
                        .get(url)
                        .then(function (response) {
                            return response.data;
                        });

        }



        function createWidget (widget, pageId) {
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http
                .post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }



        function findAllWidgetsForPage(pageId) {
            var url = "/api/assignment/page/" + pageId + "/widget";
            return $http
                        .get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }
    }
})();