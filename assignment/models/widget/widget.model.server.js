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


module.exports = widgetModel;




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