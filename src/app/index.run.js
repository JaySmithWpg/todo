(function() {
  'use strict';

  angular
    .module('procrastinator')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
