/**
 * Created by SeedofWind on 6/4/17.
 */
var app = require('../../express');

var widgetModel = require('../models/widget/widget.model.server');


app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.put('/page/:pageId/widget', sortWidget);






function sortWidget(req, res) {
    var start = req.query['start'];
    var end = req.query['end'];
    var pageId = req.params.pageId;

    widgetModel
        .sortWidget(pageId, start, end)
        .then(function (widgets) {
            res.json(widgets);
        });
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


    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget){
            widget.url = '/assignment/uploads/' + filename;

            widgetModel
                .updateWidget(widgetId, widget)
                .then(function () {
                    var callbackUrl   = "/assignment/index.html#!/" + "website/"+ websiteId + "/page/" + pageId + "/widget/" + widgetId;
                    res.redirect(callbackUrl);
                }, function (err) {
                    res.send(err);
                });
        });
}