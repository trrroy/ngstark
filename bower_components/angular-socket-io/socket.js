/*
 * angular-socket-io v0.2.0
 * (c) 2013 Brian Ford http://briantford.com
 * License: MIT
 */

'use strict';

angular.module('btford.socket-io', []).
  provider('socket', function () {

    // when forwarding events, prefix the event name
    var prefix = 'socket:',
      ioSocket;
     console.log('start socket-io');

    // expose to provider
    this.$get = function ($rootScope, $timeout) {
          console.log('socket-io get');

      var socket = ioSocket || io.connect('http://troy.doing-more.husointeractive.com:8181/socket.io', { resource : 'node/socket.io' });

      var asyncAngularify = function (callback) {
        return function () {  
          console.log('socket-io async');
          var args = arguments;
          $timeout(function () {
            callback.apply(socket, args);
          }, 0);
        };
      };

      var addListener = function (eventName, callback) {
          console.log('socket-io listener');
        socket.on(eventName, asyncAngularify(callback));
      };

      var wrappedSocket = {
        on: addListener,
        addListener: addListener,

        emit: function (eventName, data, callback) {
          if (callback) {
            socket.emit(eventName, data, asyncAngularify(callback));
          } else {
            socket.emit(eventName, data);
          }
        },

        removeListener: function () {
          var args = arguments;
          return socket.removeListener.apply(socket, args);
        },

        // when socket.on('someEvent', fn (data) { ... }),
        // call scope.$broadcast('someEvent', data)
        forward: function (events, scope) {
          if (events instanceof Array === false) {
            events = [events];
          }
          if (!scope) {
            scope = $rootScope;
          }
          events.forEach(function (eventName) {
            var prefixed = prefix + eventName;
            var forwardEvent = asyncAngularify(function (data) {
              scope.$broadcast(prefixed, data);
            });
            scope.$on('$destroy', function () {
              socket.removeListener(eventName, forwardEvent);
            });
            socket.on(eventName, forwardEvent);
          });
        }
      };

      return wrappedSocket;
    };

    this.prefix = function (newPrefix) {
      prefix = newPrefix;
    };

    this.ioSocket = function (socket) {
      ioSocket = socket;
    };
  });
