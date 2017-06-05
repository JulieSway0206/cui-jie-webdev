 /**
 * Created by SeedofWind on 5/28/17.
 */
 (function () {
     angular
         .module('WebAppMaker')
         .controller('widgetEditController', widgetEditController);

     function widgetEditController ($routeParams, $location, widgetService) {

         var model = this;

         model.userId = $routeParams['userId'];
         model.websiteId = $routeParams['websiteId'];
         model.pageId = $routeParams['pageId'];
         model.widgetId = $routeParams['widgetId'];

         model.deleteWidget = deleteWidget;
         model.updateWidget = updateWidget;

         function init() {
             widgetService
                 .findWidgetById(model.widgetId)
                 .then(function (widget) {
                     model.widget = widget;
                     model.preWidget = angular.copy(model.widget);
                 });
             widgetService.findAllWidgetsForPage(model.pageId)
                 .then(function (widgets) {
                     model.widgets = widgets;
                     model.preWidgets = angular.copy(model.widgets);
                 });
         }
         init();



         function deleteWidget(widgetId) {
             widgetService.deleteWidget(widgetId)
                          .then(function () {
                              $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                          });
         }
         function updateWidget (widgetId, widget) {
             widgetService.updateWidget(widgetId, widget)
                          .then(function () {
                              $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+ '/widget');
                          });

         }
     }
 })();