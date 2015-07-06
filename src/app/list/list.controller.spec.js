(function() {
  'use strict';

  describe('list controller', function(){
    beforeEach(module('procrastinator'));
    var completionTime = new Date('2015-10-05T18:25:43.511Z');

    it('should return motivating exclamitory text', inject(function($controller) {
      var vm = $controller('ListController');
      expect(vm.motivator).toContain("!");
    }));

    it('should return a list of five items to do', inject(function($controller) {
      var vm = $controller('ListController');
      expect(angular.isArray(vm.todoItems).toBeTruthy);
      expect(vm.todoItems.length === 5).toBeTruthy();
    }));

    it('should calculate days since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2015, 9, 11));
      var vm = $controller('ListController');
      expect(vm.getElapsedTime(completionTime)).toEqual("5 days ago");
    }));

    it('should not pluralize a singular day', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2015, 9, 7));
      var vm = $controller('ListController');
      expect(vm.getElapsedTime(completionTime)).toEqual("1 day ago");
    }));

    it('should calculate years since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2017, 9, 6));
      var vm = $controller('ListController');
      expect(vm.getElapsedTime(completionTime)).toEqual("2 years ago");
    }));

    it('should calculate minutes since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2015, 9, 5, 14,0,0));
      var vm = $controller('ListController');
      expect(vm.getElapsedTime(completionTime)).toEqual("34 minutes ago");
    }));

    it('should calculate hours since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2015, 9, 5, 16,0,0));
      var vm = $controller('ListController');
      expect(vm.getElapsedTime(completionTime)).toEqual("2 hours ago");
    }));

    it('should say "Now" for tasks completed under a second ago', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2015, 9, 5, 13,26,0));
      var vm = $controller('ListController');
      expect(vm.getElapsedTime(completionTime)).toEqual("Now");
    }));

    it('should tell us if the task has never been completed', inject(function($controller) {
      var vm = $controller('ListController');
      expect(vm.getElapsedTime(new Date(0))).toEqual("Never");
    }));

    it('should add a new entry to the list service', inject(function($controller, todoList) {
      var vm = $controller('ListController',{todoList: todoList});
      spyOn(todoList, "addItem");
      vm.newTodo = "Feed monkeys.";
      vm.newItem();
      expect(todoList.addItem).toHaveBeenCalledWith("Feed monkeys.");
    }));

    it('should clear the field after adding an item', inject(function($controller) {
      var vm = $controller('ListController');
      vm.newTodo = "Feed monkeys.";
      vm.newItem();
      expect(vm.newTodo).toEqual("");
    }));

    it('should not add blank items', inject(function($controller, todoList) {
      var vm = $controller('ListController',{todoList: todoList});
      spyOn(todoList, "addItem");
      vm.newTodo = "";
      vm.newItem();
      expect(todoList.addItem).not.toHaveBeenCalled();
    }));

    it('should set completed time to current time', inject(function($controller, todoList) {
      jasmine.clock().mockDate(new Date(2015, 9, 11));
      var vm = $controller('ListController',{todoList: todoList});
      spyOn(todoList, "markCompleted");
      vm.completeItem({'id': 4});
      expect(todoList.markCompleted).toHaveBeenCalledWith(4, new Date(2015, 9, 11));
    }));
  });
})();
