/**
 * Created by SeedofWind on 6/5/17.
 */
var app = require('../../express');
var pageModel = require('../models/page/page.model.server');


app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.post("/api/assignment/website/:websiteId/page", createPage);
app.put("/api/assignment/page/:pageId", updatePage);
app.get("/api/assignment/page/:pageId", findPageById);
app.delete("/api/assignment/page/:pageId", deletePage);

function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function (status) {
            res.json(status);
        });
}



function findPageById(req, res) {

    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}



function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

     pageModel
         .updatePage(pageId, page)
         .then(function (status) {
                  res.send(status);
              });
}



function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}


function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;

    var results = [];

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        });

}