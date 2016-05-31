angular
  .module('cold-food', ['ngRoute'])
  .controller('TweetsIndexController', TweetsIndexController);

  function TweetsIndexController () {
  var vm = this;
  vm.newTweet = {};

}
