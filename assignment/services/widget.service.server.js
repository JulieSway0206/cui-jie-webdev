/**
 * Created by SeedofWind on 6/4/17.
 */
var app = require('../../express');

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
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

    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}




function findAllWidgetsForPage(req, res) {

    var pageId = req.params.pageId;

    var results = [];
    for(var v in widgets) {
        if(widgets[v].pageId === pageId){
            results.push(widgets[v]);
        }
    }
    res.send(results);
}



function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.json(widget);
}


function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    for (var v in widgets) {
        if (widgets[v]._id === widgetId){
            widgets[v] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    res.json(widget);
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