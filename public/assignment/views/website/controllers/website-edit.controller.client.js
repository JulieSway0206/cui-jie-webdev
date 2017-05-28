/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,$location,  websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;

        function init() {
             model.websites = websiteService.findAllWebsitesForUser(model.userId);
             model.website = websiteService.findWebsiteById(model.websiteId);

        }
        init();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
        

    }

})();