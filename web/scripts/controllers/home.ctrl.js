angular.module('app')
    .controller('HomeController', 
        ["$scope", "$http", "$q", "$timeout", 
        function ($scope, $http, $q, $timeout) {

        const self = this;
        
        $scope.listDirectory = function (dirPath) {

            $scope.loadingDirectory = true;

            var q = $q.defer();
            var request = "http://localhost:3000/" + "list_dir" + dirPath;

            $http.get(request).then(function (json) {
                q.resolve(json.data);

            }, function (info) {
                console.log(info);
            });

            q.promise.then(function (data) {
                $scope.loadingDirectory = false;
                $scope.list_dir = data;
                $scope.currentPath = dirPath;
            });
        };
        
        $scope.clickFile = function (file) {
            if (!file.is_dir) {
                self.requestFileServers(file);
            }
        };

        self.requestFileServers = function(file) {
            
            $scope.mousedFile = file;                        
            $scope.loadingMousedFileServers = true;

            const fileID = file.name; /* YOU MUST CHANGE TO SET fileID */

            var q = $q.defer();
            var request = 'http://localhost:3000/' + 'servers/' + fileID;

            $http.get(request).then(function (json) {
                q.resolve(json.data);

            }, function (info) {
                console.log(info);
            });

            q.promise.then(function (data) {
                $scope.mousedFileServersList = data;
                $scope.loadingMousedFileServers = false;
            });      
        }

        $scope.currentPath = "/home";
        $scope.listDirectory($scope.currentPath);
        $scope.loadingDirectory = true;
    }]);