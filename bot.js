//configure Twitter bot
require('dotenv').config();

var config = require('./config')
var db = require('./models');

var Twit = require('twit');
var T = new Twit(config);
console.log('@ColdFoodBot is connected to Twitter.');

//read CSV data
var Baby = require('babyparse');
filePath = "menu-data/Dish.csv";
parsed = Baby.parseFiles(filePath, {
  header: true
});
rows = parsed.data;

//Generate a random dish
function getRandomDish() {
  var randomDishId = Math.floor(Math.random() * rows.length ) + 1;
  var foundDish = rows[randomDishId].name;
  foundDish = foundDish.trim();
  if (foundDish.length > 40) {
    console.log(foundDish, " is too long for Twitter. Retrying!");
    getRandomDish();
  } else {
      console.log("Found a dish: ", foundDish);
      return foundDish;
  }
}

//Generate a day's worth of tweets
function populateTweets(){
  var oneDayOfTweets = [
    {
      status: 'Breakfast: ' + getRandomDish() + '; ' + getRandomDish() + '; and ' + getRandomDish(),
      meal: 'breakfast'
    },
    {
      status: 'Lunch: ' + getRandomDish() + '; ' + getRandomDish() + '; and ' + getRandomDish()
    },
    {
      status: 'Dinner: ' + getRandomDish() + '; ' + getRandomDish() + '; and ' + getRandomDish()
    },
    {
      status: 'Snack: ' + getRandomDish() + ' and ' + getRandomDish()
    }
  ];

  db.Tweet.create(oneDayOfTweets, function(err, tweets){
    console.log(tweets[0]);
    if (err) { return console.log('Error: ', err); }
  });
}

var queueBreakfast = function() {
 db.Tweet.findOne({ 'meal': 'breakfast', 'isTweeted': false }, function (err, tweet) {
  if (err) {
    return console.log('Error: ', err);
  }
  tweetBreakfast(tweet);
  });
}

var queueLunch = function() {
 db.Tweet.findOne({ 'meal': 'lunch', 'isTweeted': false }, function (err, tweet) {
  if (err) {
    return console.log('Error: ', err);
  }
  tweetLunch(tweet);
  });
}

var queueDinner = function() {
  db.Tweet.findOne({ 'meal': 'dinner', 'isTweeted': false }, function (err, tweet) {
    if (err) {
      return console.log('Error: ', err);
    }
    tweetDinner(tweet);
    });
}

//TODO change isTweeted to true when tweeted

//tweet methods
function tweetBreakfast(tweet){
  T.post('statuses/update', { status: "iji"+tweet.status }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

function tweetLunch(tweet){
  T.post('statuses/update', { status: "iji"+tweet.status }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

function tweetDinner(tweet){
  T.post('statuses/update', { status: "iji"+tweet.status }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

function tweetSnack(tweet){
  T.post('statuses/update', { status: tweet.status }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

//schedule the tweets at mealtimes
var CronJob = require('cron').CronJob;

new CronJob('00 00 22 * * 0-6', function() {
  populateTweets()
  console.log('Tweets generated');
}, null, true, 'America/Los_Angeles');

new CronJob('00 30 07 * * 0-6', function() {
  queueBreakfast();
  console.log('Time for breakfast!');
}, null, true, 'America/Los_Angeles');

new CronJob('00 30 12 * * 0-6', function() {
  queueLunch();
  console.log('Time for lunch');
}, null, true, 'America/Los_Angeles');

new CronJob('00 30 19 * * 0-6', function() {
  queueDinner();
  console.log('Time for dinner!');
}, null, true, 'America/Los_Angeles');
