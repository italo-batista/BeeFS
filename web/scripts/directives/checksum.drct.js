(function () {
    'use strict';
    angular
        .module('app')
        .directive('checksum', function ($http) {
            return {
                restrict: 'E',
                templateUrl: 'views/checksum.html',                
                link: function (scope, element, attrs) {                
                    scope.clieckedFileChecksum = '';
                    scope.loadingChecksum = true;
                    scope.calcChecksum = function() {
                        const fileId = toString(scope.clickedFile);
                        $http.get('http://localhost:3000' + '/checksum/' + fileId)
                            .then(function (res) {
                                scope.loadingChecksum = false;
                                scope.clieckedFileChecksum = res.data.checksum;
                            })    
                    }              
                }                                  
            };
        });
})();