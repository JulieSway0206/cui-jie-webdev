/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService() {
        // any other function that is not tied to 'this' is private function
        // only tied to 'this' can be publicly used outside
        this.findAllPagesForWebsite = findAllPagesForWebsite;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.createPage = createPage;
        this.updatePage = updatePage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];


        function updatePage (pageId, page) {
            for (var v in pages) {
                if (pages[v]._id === pageId){
                    pages[v] = page;
                }
            }
        }

        function createPage(page){
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }



        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }



        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });

        }

        function findAllPagesForWebsite(websiteId) {
            var results = [];
            for(var v in pages) {
                if(pages[v].websiteId === websiteId){
                    results.push(pages[v]);
                }
            }

            return results;
        }
    }
})();