 /**
 * Created by SeedofWind on 5/28/17.
 */
 (function () {
     angular
         .module('WebAppMaker')
         .controller('widgetEditController', widgetEditController);

     function widgetEditController ($routeParams, $location, widgetService, currentUser) {

         var model = this;

         model.userId = currentUser._id;//$routeParams['userId'];
         model.websiteId = $routeParams['websiteId'];
         model.pageId = $routeParams['pageId'];
         model.widgetId = $routeParams['widgetId'];

         model.deleteWidget = deleteWidget;
         model.updateWidget = updateWidget;
         model.saveWidget = saveWidget;

         function init() {
             widgetService
                 .findWidgetById(model.widgetId)
                 .then(function (widget) {
                     model.widget = widget;
                     console.log(model.widget.name);
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
                              $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                          });
         }
         function updateWidget (widgetId, widget) {
             if (widget.name === null || widget.name === '' || typeof widget.name === 'undefined') {
                 model.error = "Name is required!";
                 model.submitted = true;
                 return;
             }
             widgetService.updateWidget(widgetId, widget)
                          .then(function () {
                              $location.url('/website/'+model.websiteId+'/page/'+model.pageId+ '/widget');
                          });

         }

         function saveWidget(widgetId, widget) {
             widgetService.updateWidget(widgetId, widget)
                 .then(function () {
                     $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widgetId+'/search');
                 });
         }
     }
 })();