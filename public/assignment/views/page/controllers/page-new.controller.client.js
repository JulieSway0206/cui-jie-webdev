/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams, $location, pageService, currentUser) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams.pageId;
        model.createPage = createPage;

        function init() {
             pageService
                        .findAllPagesForWebsite(model.websiteId)
                        .then(function (pages) {
                            model.pages = pages;
                        });
        }

        init();

        function createPage(page) {
            if (page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = "Name is required!";
                model.submitted = true;
                return;
            }
            page.websiteId = model.websiteId;
            pageService
                       .createPage(page)
                       .then(function () {
                           $location.url('/website/'+model.websiteId+'/page');
                       });
        }

    }

})();