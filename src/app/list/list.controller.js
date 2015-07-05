(function() {
  'use strict';

  angular
    .module('procrastinator')
    .controller('ListController', ListController);

  /** @ngInject */
  function ListController($timeout, motivator, todoList) {
    var vm = this;
    vm.motivator = selectMotivator();
    vm.todoItems = [];

    loadTodoList();

    function loadTodoList() {
      vm.todoItems = todoList.getItems();
      angular.forEach(vm.todoItems, calculateElapsedTime);
    }

    function calculateElapsedTime(item) {

      if (item.completed) {
        var millisInMinute = 60000;
        var millisInHour = millisInMinute * 60;
        var millisInDay = millisInHour * 24;
        var millisInYear = millisInDay * 365;

        var milli = new Date().getTime() - new Date(item.completed).getTime();

        var unit = millisInMinute;
        var scale = "minute";

        if (milli > millisInYear) {
          unit = millisInYear;
          scale = "year";
        } else if (milli > millisInDay) {
          unit = millisInDay;
          scale = "day";
        } else if (milli > millisInHour) {
          unit = millisInHour;
          scale = "hour";
        }

        var elapsed = Math.floor(milli / unit);
        item.timeElapsed = elapsed +
                           " " +
                           scale +
                           ((elapsed !== 1) ? "s" : "") +
                           " ago";
      } else {
        item.timeElapsed = "Never";
      }
    }

    function selectMotivator() {
      var motivators = motivator.getMotivators();
      return motivators[Math.floor(Math.random() * motivators.length)];
    }
  }
})();
