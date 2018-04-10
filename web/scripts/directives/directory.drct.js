(function () {
    'use strict';
    angular
        .module('app')
        .directive('directory', function ($http) {
            return {
                restrict: 'E',
                templateUrl: 'views/directory.html',
                scope: {
                    dirInfo: '=info'
                },                
                // link: function (scope, element, attrs) {                
                //     $http.get('http://localhost:3000/' + scope.current_path)
                //         .then(function (res) {
                //             scope.list_dir = res.data;
                //         })
                // }                
            };
        });
})();