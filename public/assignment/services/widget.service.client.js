/**
 * Created by SeedofWind on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);

    function widgetService() {
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>On Friday, Uber CEO Travis Kalanick’s mother, Bonnie Kalanick, was killed in a <a href="http://abc30.com/news/boating-accident-at-pine-flat-lake-leaves-woman-dead-husband-injured/2041838/" target="_blank" rel="noopener">boating accident</a> at Pine Flat Lake in California. His father, Donald Kalanick was also involved in the accident and was <a href="http://www.businessinsider.com/travis-kalanick-parents-bonnie-donald-boating-accident-2017-5" target="_blank" rel="noopener">reportedly</a> taken to a local hospital in “serious condition.”</p>'},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


        function updateWidget (widgetId, widget) {
            for (var v in widgets) {
                if (widgets[v]._id === widgetId)
                    widgets[v] = widget;
            }
        }


        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }



        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });

        }



        function createWidget(widgetType, pageId) {
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
            widget._id = (new Date()).getTime() + "";
            widget.widgetType = widgetType;
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id;
        }



        function findAllWidgetsForPage(pageId) {
            var results = [];
            for(var v in widgets) {
                if(widgets[v].pageId === pageId){
                    results.push(widgets[v]);
                }
            }

            return results;
        }
    }
})();