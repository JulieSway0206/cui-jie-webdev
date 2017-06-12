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
                     widget =  {'name': '', 'type': '', '_page': '', 'size': '', 'text': '', 'order': 1000};
                     break;
                 case "IMAGE":
                     widget =  {'name': '', 'type': '', '_page': '', 'width': '', 'url': '', 'text': '', 'order': 1000};
                     break;
                 case "YOUTUBE":
                     widget =  {'name': '', 'type': '', '_page': '', 'width': '', 'url': '', 'text': '', 'order': 1000};
                     break;
                 case "TEXT":
                     widget =  {'name': '', 'type': '', '_page': '', 'rows': '', 'placeholder': '', 'formatted': '', 'order': 1000};
                     break;
                 case "HTML":
                     widget =  {'name': '', 'type': '', '_page': '', 'text': '', 'order': 1000};
                     break;
                 default:
                     break;
             }
             widget.type = widgetType;
             widget.pageId = model.pageId;
             widgetService
                 .createWidget(widget, model.pageId)
                 .then(function (widget) {
                     $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                 });
         }

     }
 })();