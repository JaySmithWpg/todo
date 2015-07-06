(function() {
  'use strict';

  angular
      .module('procrastinator')
      .service('todoList', todoList);

  /** @ngInject */
  function todoList() {
    var data = [
      {
        'id': 1,
        'title': 'Work on app.',
        'completed': new Date('2012-04-23T18:25:43.511Z')
      },
      {
        'id': 2,
        'title': 'Do the dishes.',
        'completed': new Date('2014-04-23T18:25:43.511Z')
      },
      {
        'id': 3,
        'title': 'Talk to Bob.',
        'completed': new Date('2010-04-23T18:25:43.511Z')
      },
      {
        'id': 4,
        'title': 'Check mail.',
        'completed': new Date(0)
      },
      {
        'id': 5,
        'title': 'Rule world.',
        'completed': new Date('2012-04-23T18:25:43.511Z')
      },
    ];

    this.getItems = getItems;
    this.addItem = function(name){
      data.push({'title': name, 'completed': new Date(0)});
    };

    this.markCompleted = function(id, time){
      for(var i = data.length; i--;) {
        if(data[i].id === id) {
          data[i].completed = time;
          return;
        }
      }
    };

    this.deleteItem = function(id) {
      for(var i = data.length; i--;) {
        if(data[i].id === id) {
          data.splice(i, 1);
        }
      }
    };

    function getItems() {
      return data;
    }
  }

})();
