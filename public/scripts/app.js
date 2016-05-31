angular
  .module('cold-food', [])
  .controller('TweetsIndexController', TweetsIndexController);

function TweetsIndexController () {
  var vm = this;

  vm.newTweet = {
    status: "After dinner: Star Cocktail",
    isReady: true
  }

  vm.tweets = [
    {
      status: "Breakfast: Braised Sweet Potatoes",
      isReady: true
    },
    {
      status: "Lunch: Oyster Crumb Fry",
      isReady: true
    },
    {
      status: "Dinner: Grand Saddle of Spring Lamb a la Broche",
      isReady: false
    }
  ];

}
