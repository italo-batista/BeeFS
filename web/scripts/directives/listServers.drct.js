(function () {
    'use strict';
    angular
        .module('app')
        .directive('listServers', function ($http) {
            return {
                restrict: 'E',
                templateUrl: 'views/list-servers.html',
                // scope: {
                //     fileInfo: '=info'
                // },                
                link: function (scope, element, attrs) {               
                    scope.clickedFileServersList = scope.$parent.clickedFileServersList;
                    // const fileId = scope.clickedFile.name; /* CHANGE TO PASS FILE_ID */
                    // $http.get('http://localhost:3000/' + 'servers/' + fileID) 
                    //     .then(function (res) {
                    //         scope.clickedFileServersList = res.data;
                    //     })                    
                }                                  
            };
        });
})();

