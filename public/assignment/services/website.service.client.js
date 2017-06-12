/**
 * Created by SeedofWind on 5/27/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('websiteService', websiteService);

    function websiteService($http) {
        // any other function that is not tied to 'this' is private function
        // only tied to 'this' can be publicly used outside
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;


        function updateWebsite (websiteId, website) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.put(url, website)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function createWebsite(website, userId){
            var url = "/api/assignment/user/"+userId+"/website";
            return $http
                        .post(url, website)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function deleteWebsite(userId, websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findWebsiteById(websiteId) {
            var url = " /api/assignment/website/" + websiteId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();