/**
 * Created by SeedofWind on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce,$routeParams, widgetService, currentUser) {
        var model = this;

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        model.userId = currentUser._id;//$routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function init() {
            widgetService.findAllWidgetsForPage(model.pageId)
                         .then(function (widgets) {
                             model.widgets = widgets;
                         });
        }
        init();

        function widgetUrl(widget) {
            var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
             var embedUrl = "https://www.youtube.com/embed/";
             var linkUrlParts = linkUrl.split('/');
             embedUrl += linkUrlParts[linkUrlParts.length - 1];
             return $sce.trustAsResourceUrl(embedUrl);
        }
        
        function trust(html) {
            // scrubbing the html
          return  $sce.trustAsHtml(html);
        }

    }
})();