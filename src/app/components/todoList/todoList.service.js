(function() {
  'use strict';

  angular
      .module('procrastinator')
      .service('todoList', todoList);

  /** @ngInject */
  function todoList() {
    var data = [
      {
        'title': 'Work on app.',
        'completed': '2012-04-23T18:25:43.511Z'
      },
      {
        'title': 'Do the dishes.',
        'completed': '2014-04-23T18:25:43.511Z'
      },
      {
        'title': 'Talk to Bob.',
        'completed': '2010-04-23T18:25:43.511Z'
      },
      {
        'title': 'Check mail.',
        'completed': ''
      },
      {
        'title': 'Rule world.',
        'completed': '2012-04-23T18:25:43.511Z'
      },
    ];

    this.getItems = getItems;

    function getItems() {
      return data;
    }
  }

})();
