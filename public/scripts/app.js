angular
  .module('cold-food', [])
  .controller('TweetsIndexController', TweetsIndexController);

function TweetsIndexController () {
  var vm = this;
  vm.newTweet = {};

  vm.newTweet = {
    status: 'Testing out Angular',
    ready: false
  };
}
