/**
 * Created by SeedofWind on 6/4/17.
 */

var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');


app.get("/api/assignment/user/:userId/website", findAllWebsitesForUser);
app.post("/api/assignment/user/:userId/website", createWebsite);
app.get("/api/assignment/website/:websiteId", findWebsiteById);
app.put("/api/assignment/website/:websiteId", updateWebsite);
app.delete("/api/assignment/website/:websiteId", deleteWebsite);


function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsiteFromUser(websiteId)
        .then(function (status) {
            res.json(status);
        });
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.send(status);
        });
}



function findWebsiteById(req, res) {

    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
}

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function findAllWebsitesForUser(req, res) {
    var results = [];
    var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            });
}



