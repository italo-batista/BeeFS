angular.module('app')
    .controller('HomeController', ['$scope', "$http", "$q", function ($scope, $http, $q) {

        $scope.current_path = "list_home";
        $scope.folder_name = "Home";

        var q = $q.defer();
        var request = "http://localhost:3000/list_home";

        $http.get(request).then(function (json) {
            q.resolve(json.data);

        }, function (info) {
            console.log(info);            
        });

        q.promise.then(function(data) {
            $scope.list_dir	= data;
		});

    }]);