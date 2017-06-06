/**
 * Created by SeedofWind on 6/5/17.
 */
var app = require('../../express');

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.post("/api/assignment/website/:websiteId/page", createPage);
app.put("/api/assignment/page/:pageId", updatePage);
app.get("/api/assignment/page/:pageId", findPageById);
app.delete("/api/assignment/page/:pageId", deletePage);

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    var index = pages.indexOf(page);
    pages.splice(index, 1);
    res.sendStatus(200);
}



function findPageById(req, res) {

    var pageId = req.params.pageId;
    var page = pages.find(function (page) {
        return page._id === pageId;
    });
    res.json(page);
}



function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for (var v in pages) {
        if (pages[v]._id === pageId){
            pages[v] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}



function createPage(req, res) {
    var page = req.body;

    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}


function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;

    var results = [];
    for(var v in pages) {
        if(pages[v].websiteId === websiteId){
            results.push(pages[v]);
        }
    }
    res.send(results);
}