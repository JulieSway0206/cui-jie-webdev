/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);
    
    function pageListController($routeParams, pageService, currentUser) {
        var model = this;
        model.userId = currentUser._id;//$routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];


        function init() {
              pageService
                         .findAllPagesForWebsite(model.websiteId)
                         .then(function (pages) {
                                          model.pages = pages;
                                      });
        }

        init();
        

    }

})();