angular.module('app')
    .controller('HomeController', ['$scope', "$http", "$q", function ($scope, $http, $q) {

        $scope.listDirectory = function(dirPath) {
            
            var q = $q.defer();
            var request = "http://localhost:3000/" + "list_dir" + dirPath;
    
            $http.get(request).then(function (json) {
                q.resolve(json.data);
    
            }, function (info) {
                console.log(info);            
            });
    
            q.promise.then(function(data) {
                $scope.list_dir	= data;
                $scope.currentPath = dirPath;
            });
        };

        $scope.mouseOverFile = function(file) {
            $scope.mousedFile = file;
        };

        $scope.currentPath = "/home";      
        $scope.listDirectory($scope.currentPath);

    }]);