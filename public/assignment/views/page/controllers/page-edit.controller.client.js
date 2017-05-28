/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams, $location, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function updatePage(pageId, page) {
            pageService.updatePage(pageId, page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page')
        }
        function init() {
             model.pages = pageService.findAllPagesForWebsite(model.websiteId);
             model.page = pageService.findPageById(model.pageId);

        }
        init();

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

    }

})();