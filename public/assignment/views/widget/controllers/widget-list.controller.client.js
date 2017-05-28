/**
 * Created by SeedofWind on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce) {
        var model = this;
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>On Friday, Uber CEO Travis Kalanick’s mother, Bonnie Kalanick, was killed in a <a href="http://abc30.com/news/boating-accident-at-pine-flat-lake-leaves-woman-dead-husband-injured/2041838/" target="_blank" rel="noopener">boating accident</a> at Pine Flat Lake in California. His father, Donald Kalanick was also involved in the accident and was <a href="http://www.businessinsider.com/travis-kalanick-parents-bonnie-donald-boating-accident-2017-5" target="_blank" rel="noopener">reportedly</a> taken to a local hospital in “serious condition.”</p>'},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        model.widgets = widgets;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

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