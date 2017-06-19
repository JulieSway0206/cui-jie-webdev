/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,$location, websiteService, currentUser) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
                           websiteService
                                         .findAllWebsitesForUser(model.userId)
                                         .then(function (websites) {
                                                model.websites = websites;
                                            });
        }

        init();

        function createWebsite(website) {
            if (website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.error = "Name is required!";
                model.submitted = true;
                return;
            }
            websiteService
                         .createWebsite(website, model.userId)
                         .then(function () {
                             $location.url('/website');
                         });
        }
        

    }

})();