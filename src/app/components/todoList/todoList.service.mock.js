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
        'completed': new Date('2015-10-05T18:25:43.511Z')
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
    this.addItem = function(){};
    this.markCompleted = function(){};
    this.deleteItem = function(){};

    function getItems() {
      return data;
    }
  }

})();
