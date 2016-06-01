angular
  .module('cold-food', [])
  .controller('TweetsIndexController', TweetsIndexController);

TweetsIndexController.$inject = ['$http'];
function TweetsIndexController ( $http ) {
  var vm = this;

  $http({
      method: 'GET',
      url: '/tweets'
    }).then(function successCallback(response) {
      vm.tweets = response.data;
    }, function errorCallback(response) {
      console.log('There was an error getting the data', response);
    });

  vm.deleteTweet = function (tweet) {
    $http({
      method: 'DELETE',
      url: '/tweets/'+ tweet._id
    }).then(function successCallback(json) {
      var index = vm.tweets.indexOf(tweet);
      vm.tweets.splice(index, 1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }
}
