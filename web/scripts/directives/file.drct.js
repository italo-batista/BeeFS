(function () {
    'use strict';
    angular
        .module('app')
        .directive('file', function ($http) {
            return {
                restrict: 'E',
                templateUrl: 'views/file.html',
                scope: {
                    fileInfo: '=info'
                },                
            };
        });
})();