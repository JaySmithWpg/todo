(function() {
  'use strict';

  describe('list service with no data', function(){

    beforeEach(module('procrastinator'));

    beforeEach(module(function($provide) {
      var mockStorageService = function(){};
      mockStorageService.get = function(){};
      spyOn(mockStorageService, "get").and.returnValue(null);
      $provide.value("localStorageService", mockStorageService);
    }));

    it('should return an empty array', inject(function(_todoList_) {
      var s = _todoList_;
      var expected = [];
      expect(s.getItems).toEqual(expected);
    }));
  });

  describe('list service with data', function(){
    var mockStorageService;

    beforeEach(module('procrastinator'));

    beforeEach(module(function($provide) {
      jasmine.clock().mockDate(new Date(2015, 9, 7));
      mockStorageService = function(){};
      mockStorageService.get = function(){};
      mockStorageService.set = function(){};
      spyOn(mockStorageService, "get").and.returnValue([{'title':'Wash Monkey', 'completed' : '1970-01-01T00:00:00.000Z'}]);
      spyOn(mockStorageService, "set");

      $provide.value("localStorageService", mockStorageService);
    }));

    it('should request todoList items from storage', inject(function(_todoList_) {
      var s = _todoList_;
      expect(s.getItems).toEqual([{'title':'Wash Monkey', 'completed' : new Date(0)}]);
      expect(mockStorageService.get).toHaveBeenCalledWith("todoList");
    }));

    it('should insert new records into storage', inject(function(_todoList_) {
      var s = _todoList_;
      var expected = [{'title':'Wash Monkey', 'completed' : new Date(0)},
                      {'title':'Test Task', 'completed' : new Date(0)}];
      s.addItem("Test Task");

      expect(mockStorageService.set).toHaveBeenCalledWith("todoList", expected);
      expect(s.getItems).toEqual(expected);
    }));

    it('should mark items as completed', inject(function(_todoList_) {
      var s = _todoList_;
      var expected = [{'title':'Wash Monkey', 'completed' : new Date()}];
      s.markCompleted("Wash Monkey", new Date());

      expect(mockStorageService.set).toHaveBeenCalledWith("todoList", expected);
      expect(s.getItems).toEqual(expected);
    }));

    it('should remove items', inject(function(_todoList_) {
      var s = _todoList_;
      var expected = [];
      s.deleteItem("Wash Monkey");

      expect(mockStorageService.set).toHaveBeenCalledWith("todoList", expected);
      expect(s.getItems).toEqual(expected);
    }));

    it('should not allow duplicate items', inject(function(_todoList_) {
      var s = _todoList_;
      var expected = [{'title':'Wash Monkey', 'completed' : new Date(0)}];
      s.addItem("Wash Monkey");
      expect(s.getItems).toEqual(expected);
    }));
  });
})();
