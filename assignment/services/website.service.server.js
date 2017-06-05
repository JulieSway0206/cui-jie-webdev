/**
 * Created by SeedofWind on 6/4/17.
 */

var app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/assignment/user/:userId/website", findAllWebsitesForUser);
app.post("/api/assignment/user/:userId/website", createWebsite);
app.get("/api/assignment/website/:websiteId", findWebsiteById);
app.put("/api/assignment/website/:websiteId", updateWebsite);
app.delete("/api/assignment/website/:websiteId", deleteWebsite);


function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;

    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    for (var v in websites) {
        if (websites[v]._id === websiteId){
            websites[v] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}



function findWebsiteById(req, res) {

    var websiteId = req.params.websiteId;
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    res.json(website);
}

function createWebsite(req, res) {
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.json(website);
}

function findAllWebsitesForUser(req, res) {
    var results = [];
    var userId = req.params.userId;

    for(var v in websites) {
        if(websites[v].developerId === userId){
            results.push(websites[v]);
        }
    }

    res.json(results);
}



