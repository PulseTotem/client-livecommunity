'use strict';

/**
 * @ngdoc function
 * @name PulseTotemVideo.controller:StartCtrl
 * @description
 * # StartCtrl
 * Controller of the PulseTotemVideo
 */
angular.module('PulseTotemVideo')
  .controller('PulseTotemVideo.StartCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $rootScope.activeMenu = 'video';
    $rootScope.activeNavbar = '';
  }]);
