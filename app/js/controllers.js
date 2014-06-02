'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
	.controller('TaskController', ['$scope', function($scope) {
      $scope.tasks = [
        { date: '06/01/2014', parsedDate: moment('06/01/2014', 'MM/DD/YYYY'), name: 'Do laundry',
          description: 'Whites only', priority: 'high',
          isDone: false, isVisible: true },
        { date: '06/02/2014', parsedDate: moment('06/02/2014', 'MM/DD/YYYY'), name: 'Wash dishes',
          description: 'Handwash pots', priority: 'medium',
          isDone: false, isVisible: true },
        { date: '06/03/2014', parsedDate: moment('06/03/2014', 'MM/DD/YYYY'), name: 'Make bed',
          description: 'By 10am', priority: 'low',
          isDone: false, isVisible: true }
      ];
      $scope.hiddenTasks = [];
      $scope.currentDate = '';
      $scope.currentName = '';
      $scope.currentDescription = '';
      $scope.currentPriority = 'auto';
      $scope.priorities = ['auto', 'overdue', 'high', 'medium', 'low'];

      $scope.setColor = function(task) {
        if (task.isDone) {
          return { color: 'lime' };
        } else if (task.priority === 'overdue') {
          return { color: 'red' };
        } else if (task.priority === 'high') {
      		return { color: 'maroon' };
      	} else if (task.priority === 'medium') {
      		return { color: 'orange' };
        } else if (task.priority === 'low') {
          return { color: 'green' };
      	}
      };

      $scope.setPriority = function(task, p) {
        if (p === 'auto') {
          var diff = task.parsedDate.diff(moment(), 'days');
          if (diff == 0 || diff == 1) {
            task.priority = 'high';
          } else if (diff > 1 && diff <= 7) {
            task.priority = 'medium';
          } else if (diff > 7) {
            task.priority = 'low';
          } else {
            task.priority = 'overdue';
          }
        }
      };

      $scope.updateDate = function(task) {
        task.parsedDate = moment(task.date, 'MM/DD/YYYY');
        $scope.setPriority(task, 'auto');
      };

      $scope.add = function() {
        var parsedDate = moment($scope.currentDate, 'MM/DD/YYYY');
        var priorityAuto = $scope.currentPriority;
        if ($scope.currentPriority === 'auto') {
          var diff = parsedDate.diff(moment(), 'days');
          if (diff == 0 || diff == 1) {
            priorityAuto = 'high';
          } else if (diff > 1 && diff <= 7) {
            priorityAuto = 'medium';
          } else if (diff > 7) {
            priorityAuto = 'low';
          } else {
            priorityAuto = 'overdue';
          }
        }
      	$scope.tasks.unshift({
          date: $scope.currentDate,
      		parsedDate: parsedDate,
          name: $scope.currentName,
          description: $scope.currentDescription,
      		priority: priorityAuto,
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
        $scope.hiddenTasks.unshift(task);
        task.isVisible = false;
      };

      $scope.rehide = function() {
        for (var index in $scope.hiddenTasks) {
          var i = $scope.tasks.indexOf($scope.hiddenTasks[index]);
          if (i > -1) {
            var task = $scope.tasks[i];
            task.isVisible = false;
          }
        }
      };

      $scope.remove = function(task) {
        var index = $scope.tasks.indexOf(task);
        if (index > -1) {
          $scope.tasks.splice(index, 1);
        }
      };
  	}]);