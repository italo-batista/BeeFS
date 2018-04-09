(function () {
  'use strict';

  angular.module('app', ['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'HomeController',
          templateUrl: 'views/home.html'
        })
        .otherwise({
          redirectTo: '/'
        });

    })
  
})();