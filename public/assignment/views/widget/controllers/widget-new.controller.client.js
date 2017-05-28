 /**
 * Created by SeedofWind on 5/28/17.
 */
 (function () {
     angular
         .module('WebAppMaker')
         .controller('widgetNewController', widgetNewController);

     function widgetNewController ($routeParams, $location, widgetService) {

         var model = this;

         model.userId = $routeParams['userId'];
         model.websiteId = $routeParams['websiteId'];
         model.pageId = $routeParams['pageId'];

         model.createWidget = createWidget;


         function createWidget (widgetType) {
             widgetId = widgetService.createWidget(widgetType, model.pageId);
             $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widgetId);
         }

     }
 })();