/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService($http) {
        // any other function that is not tied to 'this' is private function
        // only tied to 'this' can be publicly used outside
        this.findAllPagesForWebsite = findAllPagesForWebsite;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.createPage = createPage;
        this.updatePage = updatePage;


        function updatePage (pageId, page) {
            // for (var v in pages) {
            //     if (pages[v]._id === pageId){
            //         pages[v] = page;
            //     }
            // }
            var url = "/api/assignment/page/"+ pageId;
            return $http
                        .put(url, page)
                        .then(function (response) {
                          return response.data;
                   });
        }

        function createPage(page){
            // page._id = (new Date()).getTime() + "";
            // pages.push(page);
            var url = "/api/assignment/website/" + page.websiteId + "/page";
            return $http
                        .post(url, page)
                        .then(function (response) {
                           return response.data;
                      });
        }



        function deletePage(pageId) {
            // var page = findPageById(pageId);
            // var index = pages.indexOf(page);
            // pages.splice(index, 1);
            var url = "/api/assignment/page/"+ pageId;
            return $http
                        .delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findPageById(pageId) {
            // return pages.find(function (page) {
            //     return page._id === pageId;
            // });
           var url = "/api/assignment/page/"+ pageId;
           return $http
                       .get(url)
                       .then(function (response) {
                         return response.data;
                     });
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId + "/page";
            return $http.get(url)
                        .then(function (response) {
                           return response.data;
                     });
        }
    }
})();