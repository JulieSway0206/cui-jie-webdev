/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,$location,  websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
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
            website.developerId = model.userId;
            websiteService
                         .createWebsite(website, model.userId)
                         .then(function () {
                             $location.url('/user/'+model.userId+'/website');
                         });
        }
        

    }

})();