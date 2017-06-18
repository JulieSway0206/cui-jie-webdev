/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams, $location, pageService, currentUser) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function updatePage(pageId, page) {
            pageService
                      .updatePage(pageId, page)
                      .then(function () {
                          $location.url('/website/'+model.websiteId+'/page');
                      });
        }

        function init() {
             pageService.findAllPagesForWebsite(model.websiteId)
                        .then(function (pages) {
                            model.pages = pages;
                            model.prePages = angular.copy(model.pages);
                        });
             pageService.findPageById(model.pageId)
                        .then(function (page) {
                            model.page = page;
                            model.prePage = angular.copy(model.page);
                        });

        }

        init();



        function deletePage(pageId) {
            pageService
                       .deletePage(pageId)
                       .then(function () {
                           $location.url('/website/'+model.websiteId+'/page');
                       });
        }

    }

})();