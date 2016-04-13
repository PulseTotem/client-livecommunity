'use strict';

/**
 * @ngdoc overview
 * @name pulsetotemLiveCommunityClientApp
 * @description
 * # routes
 *
 * Define routes available in application.
 */
angular
  .module('pulsetotemLiveCommunityClientApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      // Routes for home
      .when('/', {
        redirectTo: '/video'
      })

      // Routes for video
      .when('/video/', {
        templateUrl: '../video/views/start.html',
        controller: 'PulseTotemVideo.StartCtrl'
      })

      // All other stuff
      .otherwise({
        redirectTo: '/'
      });
  }]);
