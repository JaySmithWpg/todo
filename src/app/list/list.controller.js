(function() {
  'use strict';

  angular
    .module('procrastinator')
    .controller('ListController', ListController);

  /** @ngInject */
  function ListController($timeout, todoList) {
    var vm = this;
    vm.motivator = "Do the thing!";
    vm.todoItems = todoList.getItems();
  }
})();
