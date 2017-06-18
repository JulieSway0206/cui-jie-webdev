/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService, currentUser) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];


        function init() {
             // model.websites = websiteService.findAllWebsitesForUser(model.userId);
            websiteService
                         .findAllWebsitesForUser(model.userId)
                         .then(renderWebsites);

        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }

})();