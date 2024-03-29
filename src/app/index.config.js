(function() {
  'use strict';

  angular
    .module('procrastinator')
    .config(config);

  /** @ngInject */
  function config($logProvider, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    localStorageServiceProvider.setPrefix('procrast')
                               .setNotify(false, false);
  }
})();
