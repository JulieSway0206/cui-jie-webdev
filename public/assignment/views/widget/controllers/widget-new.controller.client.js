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
             switch (widgetType) {
                 case "HEADING":
                     widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'size': '', 'text': ''};
                     break;
                 case "IMAGE":
                     widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'width': '', 'url': '', 'text': ''};
                     break;
                 case "YOUTUBE":
                     widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'width': '', 'url': '', 'text': ''};
                     break;
                 default:
                     break;
             }
             widget.widgetType = widgetType;
             widget.pageId = model.pageId;
             widgetService
                 .createWidget(widget, model.pageId)
                 .then(function (widget) {
                     $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                 });
         }

     }
 })();