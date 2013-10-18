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
    $scope.go = function ( path ) {
      $location.path( path );
    };
    console.log('DONE menu');
  })
  .controller('taskCntl', function($scope, $route, $routeParams, $location, $http, taskService, socket) {
    $scope.tasks = [];
    updateTasks();
    socket.on('message', function(data) {
      console.log("channel:" + data.channel);
      updateTasks();
    });
    function updateTasks() {
      taskService.async().then(function(d) {
        $scope.tasks = d;
      });
    }
    //socket.emit('message', {"channel":"core_test"});

    console.log('DONE tasks: auth:' + Drupal.settings.nodejs.authToken);
  })
  .controller('contactCntl', function($scope, $rootScope, $route, $routeParams, $location, $http, peopleService, socket) {
    $scope.contactList = [];
    updateContacts();
    socket.on('message', function(data) {
      updateContacts();
    });
    function updateContacts() {
      peopleService.async().then(function(d) {
        $scope.contactList = d;
      });
    }
    console.log('DONE contacts');
  });
