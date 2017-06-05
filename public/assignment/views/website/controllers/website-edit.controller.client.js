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
              websiteService
                            .findAllWebsitesForUser(model.userId)
                            .then(function (websites) {
                                model.websites = websites;
                                model.preWebsites = angular.copy(model.websites);
                                           });
              websiteService
                            .findWebsiteById(model.websiteId)
                            .then(function (website) {
                                model.website = website;
                                model.preWebsite = angular.copy(model.website);
                                           });
        }

        init();


        function updateWebsite (websiteId, website) {
            websiteService
                          .updateWebsite(websiteId, website)
                          .then(function () {
                              $location.url('/user/' + model.userId + '/website');
                          });
        }

        function deleteWebsite(websiteId) {
            websiteService
                         .deleteWebsite(websiteId)
                         .then(function () {
                             $location.url('/user/'+model.userId+'/website');
                         });
        }
        

    }

})();