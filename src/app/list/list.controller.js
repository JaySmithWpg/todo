(function() {
  'use strict';

  angular
    .module('procrastinator')
    .controller('ListController', ListController);

  /** @ngInject */
  function ListController($timeout, motivator, todoList) {
    var vm = this;
    vm.motivator = selectMotivator();
    vm.todoItems = todoList.getItems();

    function selectMotivator() {
      var motivators = motivator.getMotivators();
      return motivators[Math.floor(Math.random() * motivators.length)];
    }
  }
})();
