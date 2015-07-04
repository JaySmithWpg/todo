(function() {
  'use strict';

  angular
      .module('procrastinator')
      .service('motivator', motivator);

  /** @ngInject */
  function motivator() {
    var data = ["You can do the thing!",
                "You got this!",
                "You're going to get it done!",
                "Productivity!"];

    this.getMotivators = getMotivators;

    function getMotivators() {
      return data;
    }
  }

})();
