angular
  .module('cold-food', ['ngRoute'])
  .config(config)

function config ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/tweets',
      controllerAs: 'tweetsIndexCtrl',
      controller: 'TweetsIndexController'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}
