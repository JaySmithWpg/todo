(function() {
  'use strict';

  angular
      .module('procrastinator')
      .service('todoList', todoList);

  /** @ngInject */
  function todoList(localStorageService) {
    var data = getItems();
    this.getItems = data;

    this.addItem = function(title){
      for(var i = data.length; i--;) {
        if(data[i].title === title) {
          //Item Exists, abort
          return false;
        }
      }
      data.push({'title': title, 'completed': new Date(0)});
      persistItems();
      return true;
    };

    this.markCompleted = function(title, time){
      for(var i = data.length; i--;) {
        if(data[i].title === title) {
          data[i].completed = time;
          persistItems();
          return;
        }
      }
    };

    this.deleteItem = function(title) {
      for(var i = data.length; i--;) {
        if(data[i].title === title) {
          data.splice(i, 1);
          persistItems();
        }
      }
    };

    function persistItems() {
      localStorageService.set("todoList", data);
    }

    function getItems() {
      var result = localStorageService.get("todoList");
      if (!result) {return [];}

      angular.forEach(result, function(item)
      {
        item.completed = new Date(item.completed);
      });
      return result;
    }
  }

})();
