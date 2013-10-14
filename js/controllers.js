'use strict';

angular.module('ngStark.controllers', [])
  .controller('homeCntl', function($scope, $route, $routeParams, $location, $http, localStorageService) {
    $scope.nodes = [];
    $scope.node = [];
    //$scope.nid = 649;
    console.log('current path=' + $scope.current_path);
    console.log('nid=' + $scope.nid);
    if ($scope.nid) {
      var url = "/contentasjson/node/" + $scope.nid;
      $http.get(url).then(function(response) {
        $scope.node = response.data;
        console.log('url: ' + url);
        $scope.nodes.push($scope.node);
        console.log('YES data loaded');
      });
    } else {
      console.log('no data loaded (ngStark)');
    }
  })
  .controller('menuCntl', function($scope, $route, $routeParams, $location, $http) {
    $scope.mainMenu = [];
    $scope.$location = $location;
    $http.get('/contentasjson/menu/main-menu').then(function(response) {
      $scope.mainMenu = response.data;
      console.log('menu: ' + $scope.mainMenu);
      console.log('YES menu loaded');
    });
    console.log('DONE menu');
  })
  .controller('taskCntl', function($scope, $route, $routeParams, $location, $http) {
    $scope.taskList = [];
    $http.get('/contentasjson/view/task_list-block_4').then(function(response) {
      $scope.taskList = response.data;
      console.log('tasks: ' + $scope.taskList);
      console.log('YES tasks loaded');
    });
    console.log('DONE tasks');
  });
