angular
  .module('cold-food')
  .controller('TweetsIndexController', TweetsIndexController);

TweetsIndexController.$inject = ['$http'];

function TweetsIndexController ($http) {
  var vm = this;
  vm.newTweet = {};
  vm.newTweet = {
    status: '',
    ready: false
  };

  $http({
    method: 'GET',
    url: '/tweets'
  }).then(function successCallback(response) {
    vm.tweets = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the tweets', response);
  });

  vm.createAlbum = function () {
    $http({
      method: 'POST',
      url: '/tweets',
      data: vm.newAlbum,
    }).then(function successCallback(response) {
      vm.albums.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.editTweet = function (tweet) {
    $http({
      method: 'PUT',
      url: '/'+tweet._id,
      data: tweet
    }).then(function editTweetSuccess(json) {
    }, function editTweetError(response) {
      console.log('There was an error editing the tweet', response);
    });
  }
}
