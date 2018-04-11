angular.module('app')
    .controller('HomeController', ['$scope', "$http", "$q", "$timeout", function ($scope, $http, $q, $timeout) {

        const self = this;

        $scope.hoveringFile = false;
        var timerhoveringFile;

        $scope.listDirectory = function (dirPath) {

            var q = $q.defer();
            var request = "http://localhost:3000/" + "list_dir" + dirPath;

            $http.get(request).then(function (json) {
                q.resolve(json.data);

            }, function (info) {
                console.log(info);
            });

            q.promise.then(function (data) {
                $scope.list_dir = data;
                $scope.currentPath = dirPath;
            });
        };

        $scope.mouseEnter = function(file) {
            timerhoveringFile = $timeout(function () {
                $scope.hoveringFile = true;
                self.mouseOverFile(file);
                console.log('hover mouser....')               
            }, 1000);           
        }

        $scope.mouseLeave = function() {
            $timeout.cancel(timerhoveringFile);
            $scope.hoveringFile = false;
            console.log('hover left...') 
        }        
  
        self.mouseOverFile = function (file) {
            $scope.mousedFile = file;

            if (!file.is_dir) {
                self.requestMousedFileServers(file.name);
            }
        };

        // function sleep(ms) {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // }

        // async function demo() {
        //     const oneSec = 1000;
        //     await sleep(oneSec);
        // }

        self.requestMousedFileServers = function(fileID) {
            
            // const twoSecs = 2000;
            // await sleep(twoSecs);
            
            $scope.loadingMousedFileServers = true;

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

    }]);