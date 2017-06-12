/**
 * Created by SeedofWind on 6/4/17.
 */
var app = require('../../express');

var widgetModel = require('../models/widget/widget.model.server');

var widgets = [
    {"_id": "123", "name": "heading1", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "name": "heading2", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {"_id": "345", "name": "image1", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/", "text": "Lorem ipsum"},
    {"_id": "456", "name": "html1", "widgetType": "HTML", "pageId": "321", "text": "<p>American Airlines Group’s total revenue passenger miles (RPMs) were a record 18.6 billion, up 3.1 percent versus April 2016. Total capacity was 22.6 billion available seat miles (ASMs), up 0.8 percent versus April 2016. Total passenger load factor was 82.2 percent, up 1.8 percentage points versus April 2016.</p>"},
    {"_id": "567", "name": "heading3", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {"_id": "678", "name": "youtube1", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E", "text": "Lorem ipsum"},
    {"_id": "789", "name": "html2", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.put('/page/:pageId/widget', sortWidget);




function sortWidget(req, res) {
    var initial = req.query.initial;
    var final = req.query.final;
    var widgetContainer=[];
    var pageId = req.params.pageId;
    var length = widgets.length;
    for (var i =  length - 1; i >= 0; i--){
        if (widgets[i].pageId === pageId){
            widgetContainer.unshift(widgets[i]);
            widgets.splice(i, 1);
        }
    }
    var widget = widgetContainer[initial];
    widgetContainer.splice(initial, 1);
    widgetContainer.splice(final, 0, widget);
    widgets = widgets.concat(widgetContainer);
    res.sendStatus(200);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.json(status);
        });
}




function findAllWidgetsForPage(req, res) {

    var pageId = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.send(widgets);
        });
}



function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}


function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.send(status);
        });
}

function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });
}




/////////upload image////

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });

    widget.url = '/assignment/uploads/' + filename;
    var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/"+ websiteId + "/page/" + pageId + "/widget/" + widgetId;
    res.redirect(callbackUrl);
}