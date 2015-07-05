(function() {
  'use strict';

  describe('list controller', function(){

    beforeEach(module('procrastinator'));

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
      var item = vm.todoItems[0];
      expect(item.timeElapsed).toEqual("5 days ago");
    }));

    it('should calculate day since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2015, 9, 7));

      var vm = $controller('ListController');
      var item = vm.todoItems[0];
      expect(item.timeElapsed).toEqual("1 day ago");
    }));

    it('should calculate years since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2017, 9, 6));

      var vm = $controller('ListController');
      var item = vm.todoItems[0];
      expect(item.timeElapsed).toEqual("2 years ago");
    }));

    it('should calculate year since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2016, 9, 6));

      var vm = $controller('ListController');
      var item = vm.todoItems[0];
      expect(item.timeElapsed).toEqual("1 year ago");
    }));

    it('should calculate minutes since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2015, 9, 5, 14,0,0));

      var vm = $controller('ListController');
      var item = vm.todoItems[0];
      expect(item.timeElapsed).toEqual("34 minutes ago");
    }));

    it('should calculate hours since completion', inject(function($controller) {
      jasmine.clock().mockDate(new Date(2015, 9, 5, 16,0,0));

      var vm = $controller('ListController');
      var item = vm.todoItems[0];
      expect(item.timeElapsed).toEqual("2 hours ago");
    }));

    it('should tell us if the task has never been completed', inject(function($controller) {
      var vm = $controller('ListController');
      var item = vm.todoItems[3];
      expect(item.timeElapsed).toEqual("Never");
    }));

  });
})();
