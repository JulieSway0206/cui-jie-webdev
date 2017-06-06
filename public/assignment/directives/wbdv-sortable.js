/**
 * Created by SeedofWind on 6/6/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvDirectives', wdSortable);

    function wdSortable(widgetService) {
        var initial = -1;
        var final = -1;
        function linkFunction(scope, element) {
            element.sortable({
                scroll: false,
                axis: "y",
                start: function (event, ui) {
                    initial = ui.item.index();
                },
                stop: function (event, ui) {
                    final = ui.item.index();
                    widgetService
                             .sortWidget(initial, final);

                }
            });
        }
        return{
            link: linkFunction
        }
    }
})();