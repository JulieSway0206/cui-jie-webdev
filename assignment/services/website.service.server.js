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

app.get("/api/user/:userId/website", findAllWebsitesForUser);

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



