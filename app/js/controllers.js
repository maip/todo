'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
	.controller('TaskController', ['$scope', function($scope) {
      $scope.tasks = [
        { date: '06/01/2014', name: 'Do laundry', description: 'Whites only',
          priority: 'high', isDone: false, isVisible: true },
        { date: '06/02/2014', name: 'Wash dishes', description: 'Handwash pots',
          priority: 'medium', isDone: false, isVisible: true },
        { date: '06/03/2014', name: 'Make bed', description: 'By 10am',
          priority: 'low', isDone: false, isVisible: true }
      ];
      $scope.currentDate = '';
      $scope.currentName = '';
      $scope.currentDescription = '';
      $scope.currentPriority = 'high';
      $scope.priorities = ['high', 'medium', 'low'];

      $scope.setColor = function(task) {
        if (task.isDone) {
          return { color: 'lime' };
        } else if (task.priority === 'high') {
      		return { color: 'red' };
      	} else if (task.priority === 'medium') {
      		return { color: 'orange' };
        } else if (task.priority === 'low') {
          return { color: 'green' };
      	}
      };

      $scope.setIsDone = function(status, task) {
        // var index = $scope.tasks.indexOf(task);
        // if (index > -1) {
        //   $scope.tasks.splice(index, 1);
        // }
        // $scope.doneTasks.push(task);
        if (!status) {
          task.isDone = true;
        } else {
          task.isDone = false;
        }
      };

      $scope.add = function() {
      	$scope.tasks.unshift({
      		date: $scope.currentDate,
          name: $scope.currentName,
          description: $scope.currentDescription,
      		priority: $scope.currentPriority,
          isDone: false,
          isVisible: true
      	});
        $scope.currentDate = '';
        $scope.currentName = '';
        $scope.currentDescription = '';
      };

      $scope.show = function() {
        for (var index in $scope.tasks) {
          var task = $scope.tasks[index];
          if (!task.isVisible) {
            task.isVisible = true;
          }
        }
      };

      $scope.hide = function(task) {
        task.isVisible = false;
      };
      
      $scope.remove = function(task) {
        var index = $scope.tasks.indexOf(task);
        if (index > -1) {
          $scope.tasks.splice(index, 1);
        }
      };
  	}]);