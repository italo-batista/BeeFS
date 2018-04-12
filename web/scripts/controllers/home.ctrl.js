angular.module('app')
    .controller('HomeController',
    ["$scope", "$http", "$q", "$timeout", "$mdDialog",
        function ($scope, $http, $q, $timeout, $mdDialog) {

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
                    $scope.anyFileClicked = true;
                    self.requestFileServers(file);
                }
            };

            self.requestFileServers = function (file) {

                $scope.clickedFile = file;
                $scope.loadingclickedFileServers = true;

                const fileID = file.name; /* YOU MUST CHANGE TO SET fileID */

                var q = $q.defer();
                var request = 'http://localhost:3000/' + 'servers/' + fileID;

                $http.get(request).then(function (json) {
                    q.resolve(json.data);

                }, function (info) {
                    console.log(info);
                });

                q.promise.then(function (data) {
                    $scope.clickedFileServersList = data;
                    $scope.loadingclickedFileServers = false;
                });
            }

            $scope.openMigrationDialog = function (ev) {
        
                $mdDialog.show({
                    templateUrl: '../../views/migration-dialog.html',
                    parent: angular.element(document.body),
                    scope: $scope.$new(),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen,
                    controller: MyMigrationController,
                    controllerAs: 'migCtrl'
                });

                function MyMigrationController($scope, $mdDialog, $q, $http) {
                    
                    const self = this;

                    self.targetServer = "Nada";

                    $scope.hide = function () {
                        $mdDialog.hide();
                    };
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                    $scope.answer = function (answer) {
                        $mdDialog.hide(answer);
                    };
                    $scope.migrateFileTo = function (fileId) {
                        
                        // fileId is currently file.path. CHANGE IT
                        
                        console.log(self.targetServer);
                        console.log(fileId);

                        // var q = $q.defer();
                        // var route = "";
                        // $http.get(route).then(function (info) {
                        //     q.resolve(info.data);
                        //     // atribuições aqui
                        // }, function (info) {
                        // });
                        // return q.promise;
                    }
                }
            }

            $scope.currentPath = "/home";
            $scope.listDirectory($scope.currentPath);
            $scope.loadingDirectory = true;
            $scope.loadingclickedFileServers = false;
            $scope.anyFileClicked = false;

        }]);