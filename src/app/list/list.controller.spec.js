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
  });
})();
