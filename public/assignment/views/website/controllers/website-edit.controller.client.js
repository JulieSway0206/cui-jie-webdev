/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams, $location, websiteService, currentUser) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
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
                              $location.url('/website');
                          });
        }

        function deleteWebsite(websiteId) {
            websiteService
                         .deleteWebsite(model.userId, websiteId)
                         .then(function () {
                             $location.url('/website');
                         });
        }
        

    }

})();