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
        model.updateWebsite = updateWebsite;

        function init() {
             model.websites = websiteService.findAllWebsitesForUser(model.userId);
             model.website = websiteService.findWebsiteById(model.websiteId);

        }
        init();
        model.preWebsites = angular.copy(model.websites);
        model.preWebsite = angular.copy(model.website);
        function updateWebsite (websiteId, website) {
            websiteService.updateWebsite(websiteId, website);
            $location.url('/user/' + model.userId + '/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }
        

    }

})();