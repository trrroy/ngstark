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
  .controller('taskCntl', function($scope, $route, $routeParams, $location, $http, $resource, taskService, socket) {
    $scope.tasks = taskService.query();
    socket.on('message', function(data) {
      console.log('task message');
      // Grab all tasks when new added via socket.
      $scope.tasks = taskService.query();

      $scope.tasks.push(data);
    });

    // Complete/update task.
    $scope.taskCompleted = function(task) {
      console.log('task taskCompleted');
      task.$update();
      socket.emit('update_task', task);
    }
    socket.on('taskUpdated', function(task) {
      console.log('task updated');
      // Update on all connected clients.
      console.log(task);
    });

    $scope.removeTask = function(task) {
      console.log('task remove');
      var index = $scope.tasks.indexOf(task);
      socket.emit("delete_task", JSON.stringify(index));
      $scope.tasks.splice(index, 1);
      task.$remove();
    }
    socket.on('taskDeleted', function(index) {
      console.log('task deleted');
      $scope.tasks.splice(index, 1);
    });
    console.log('DONE tasks');
  })
  .controller('contactCntl', function($scope, $rootScope, $route, $routeParams, $location, $http, $resource, peopleService, socket) {
    $scope.contactList = peopleService.query();
    /*$scope.contactList = [];
    peopleService.async().then(function(d) {
      $scope.contactList = d;
    });*/
    /*$http.get('/contentasjson/view/contacts_list-block_1').then(function(response) {
      $scope.contactList = response.data;
      console.log('contacts: ' + $scope.contactList);
      console.log('YES contacts loaded');
    });*/
    console.log('cntllr contacts: ' + $scope.contactList);
    console.log('DONE contacts');
  });
