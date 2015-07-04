(function() {
  'use strict';

  angular
    .module('procrastinator')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/list/list.html',
        controller: 'ListController',
        controllerAs: 'list'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
