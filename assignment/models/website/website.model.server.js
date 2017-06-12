/**
 * Created by SeedofWind on 6/11/17.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');
//api
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsiteFromUser = deleteWebsiteFromUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;



module.exports = websiteModel;




function deletePage(pageId) {
    return websiteModel
        .findOne({pages: pageId})
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}



function addPage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}


function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}

function findWebsiteById(websiteId) {
     return websiteModel.findById(websiteId);
}

function deleteWebsiteFromUser(websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                   .deleteWebsite(websiteId);
        });
}


function findAllWebsitesForUser(userId) {
    return websiteModel
                    .find({_user: userId})
                    .populate('_user')
                    .exec();
}





function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel.create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id);
        });
}




function findAllWebsites() {
    return websiteModel.find();
}
