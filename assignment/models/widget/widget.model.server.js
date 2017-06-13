/**
 * Created by SeedofWind on 6/12/17.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

//api

widgetModel.findAllWidgets = findAllWidgets;
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.sortWidget = sortWidget;

module.exports = widgetModel;




function sortWidget(pageId, start, end) {
      return widgetModel
               .find({_page: pageId}, function (err, docs) {
             widgets = docs.map(function (d) { return d.toObject() });


    var widget = widgets[start];
    widgets.splice(start, 1);
    widgets.splice(end, 0, widget);


    for(var i = 0; i < widgets.length; i++){
        widgets[i].order = i;
    }
    return widgetModel
        .remove({_page: pageId})
        .then(function (staus) {
            return widgetModel
                       .create(widgets)
                       .then(function (widgets) {
                           return widgets;
                       });
        })})
          .sort({'order': 1})
          .exec();
}




function deleteWidget(widgetId) {
    return widgetModel
             .remove({_id: widgetId})
             .then(function (status) {
                return pageModel
                    .deleteWidget(widgetId);
        });
}




function updateWidget(widgetId, newWidget) {
    return widgetModel
        .update({_id: widgetId}, {$set: newWidget});
}



function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .sort({'order': 1})
        .populate('_page')
        .exec();
}



function findWidgetById(widgetId) {
    return widgetModel
              .findById(widgetId);
}


function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
               .create(widget)
               .then(function (widget) {
                   pageModel
                       .addWidget(pageId, widget._id);
                   return widget;
               });
}


function findAllWidgets() {
    return widgetModel.find();
}