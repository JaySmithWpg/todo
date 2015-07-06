(function() {
  'use strict';

  angular
    .module('procrastinator')
    .controller('ListController', ListController);

  /** @ngInject */
  function ListController(motivator, todoList) {
    var MILLIS_IN_MINUTE = 60000;
    var MILLIS_IN_HOUR = MILLIS_IN_MINUTE * 60;
    var MILLIS_IN_DAY = MILLIS_IN_HOUR * 24;
    var MILLIS_IN_YEAR = MILLIS_IN_DAY * 365;

    this.motivator = selectMotivator();
    this.todoItems = todoList.getItems();
    this.newTodo = "";

    function selectMotivator() {
      var motivators = motivator.getMotivators();
      return motivators[Math.floor(Math.random() * motivators.length)];
    }

    this.getElapsedTime = function(lastTime) {
      if (!lastTime || lastTime.getTime() === 0) {
        return "Never";
      }

      var et = new Date().getTime() - new Date(lastTime).getTime();
      var unit = 0;
      var scale = "";

      if (et > MILLIS_IN_YEAR) {
        unit = MILLIS_IN_YEAR;
        scale = "year";
      } else if (et > MILLIS_IN_DAY) {
        unit = MILLIS_IN_DAY;
        scale = "day";
      } else if (et > MILLIS_IN_HOUR) {
        unit = MILLIS_IN_HOUR;
        scale = "hour";
      } else if (et > MILLIS_IN_MINUTE) {
        unit = MILLIS_IN_MINUTE;
        scale = "minute";
      } else {
        return "Now";
      }

      var elapsed = Math.floor(et / unit);
      return elapsed + " " + scale + ((elapsed !== 1) ? "s" : "") + " ago";
    };

    this.newItem = function() {
      var newItem = this.newTodo.trim();
      if (newItem) {
        todoList.addItem(newItem);
        this.newTodo = "";
      }
    };

    this.completeItem = function(todoItem) {
      todoList.markCompleted(todoItem.id, new Date());
    };
  }
})();
