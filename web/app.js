(function () {
  'use strict';

  angular.module('app', ['ngRoute', 'ngMaterial', 'ngMessages'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'HomeController as ctrl',
          templateUrl: 'views/home.html'
        })
        .otherwise({
          redirectTo: '/'
        });

    })
  
})();