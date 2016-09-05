//configure Twitter bot
require('dotenv').config();

var config = require('./config')
var db = require('./models');

var Twit = require('twit');
var T = new Twit(config);
console.log('@ColdFoodBot is connected to Twitter.');

//read CSV file
var Baby = require('babyparse');
filePath = "menu-data/Dish.csv";
parsed = Baby.parseFiles(filePath, {
  header: true
});
rows = parsed.data;

//Pick a random dish
function getRandomDish() {
  var randomDishId = Math.floor(Math.random() * rows.length ) + 1;
  var foundDish = rows[randomDishId].name;
  foundDish = foundDish.trim();
  if (foundDish.length > 42) {
    console.log(foundDish, " might be too long for Twitter. Retrying!");
    getRandomDish();
  } else if (foundDish === "undefined") {
    console.log(foundDish, " is not a dish. Transcription error?");
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
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish(),
      meal: 'breakfast'
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish(),
      meal: 'lunch'
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish(),
      meal: 'dinner'
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish(),
      meal: 'snack'
    }
  ];

  db.Tweet.create(oneDayOfTweets, function(err, tweets){
    console.log("Tweets populated: ", tweets);
    if (err) { return console.log('There was an error: ', err); }
  });
}

//find a queued tweet, call the tweet function, and mark it as tweeted
var queueBreakfast = function() {
 db.Tweet.findOneAndUpdate({ 'meal': 'breakfast', 'isTweeted': false }, {$set: {'isTweeted': true}}, function (err, tweet) {
  if (err) {
    return console.log('There was an error: ', err);
  }
  tweetBreakfast(tweet);
  });
}

var queueLunch = function() {
 db.Tweet.findOneAndUpdate({ 'meal': 'lunch', 'isTweeted': false }, {$set: {'isTweeted': true}}, function (err, tweet) {
  if (err) {
    return console.log('There was an error: ', err);
  }
  tweetLunch(tweet);
  });
}

var queueDinner = function() {
  db.Tweet.findOneAndUpdate({ 'meal': 'dinner', 'isTweeted': false }, {$set: {'isTweeted': true}}, function (err, tweet) {
    if (err) {
      return console.log('There was an error: ', err);
    }
    tweetDinner(tweet);
    });
}

var queueSnack = function() {
  db.Tweet.findOneAndUpdate({ 'meal': 'snack', 'isTweeted': false }, {$set: {'isTweeted': true}}, function (err, tweet) {
    if (err) {
      return console.log('There was an error: ', err);
    }
    tweetSnack(tweet);
    });
}

//tweet methods
function tweetBreakfast(tweet){
  T.post('statuses/update', { status: tweet.status }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

function tweetLunch(tweet){
  T.post('statuses/update', { status: tweet.status }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

function tweetDinner(tweet){
  T.post('statuses/update', { status: tweet.status }, function(err, data, response) {
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

new CronJob('00 00 05 * * 0-6', function() {
  populateTweets()
  console.log('Time to generate tweets!');
}, null, true, 'Europe/Berlin');

new CronJob('00 00 10 * * 0-6', function() {
  queueBreakfast();
  console.log('Time for breakfast!');
}, null, true, 'Europe/Berlin');

new CronJob('00 00 14 * * 0-6', function() {
  queueLunch();
  console.log('Time for lunch!');
}, null, true, 'Europe/Berlin');

new CronJob('00 00 18 * * 0-6', function() {
  queueDinner();
  console.log('Time for dinner!');
}, null, true, 'Europe/Berlin');

new CronJob('00 00 22 * * 0-6', function() {
  queueSnack();
  console.log('Time for a snack!');
}, null, true, 'Europe/Berlin');

//ping the site every 15 minutes to keep the dynos from idling
var http = require("http");
setInterval(function() {
    http.get("http://cold-food.herokuapp.com");
}, 900000);
