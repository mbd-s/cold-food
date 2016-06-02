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
      status: 'Breakfast: ' + getRandomDish() + '; ' + getRandomDish() + '; and ' + getRandomDish()
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
    if (err) { return console.log('Error: ', err); }
  });
}

//bot methods
function tweetBreakfast(){
  T.post('statuses/update', { status: 'Breakfast: ' + getRandomDish() + '; ' + getRandomDish() + '; and ' + getRandomDish() }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

function tweetLunch(){
  T.post('statuses/update', { status: 'Lunch: ' + getRandomDish() + '; ' + getRandomDish() + '; and ' + getRandomDish() }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

function tweetDinner(){
  T.post('statuses/update', { status: 'Dinner: ' + getRandomDish() + '; ' + getRandomDish() + '; and ' + getRandomDish() }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

function tweetSnack(){
  T.post('statuses/update', { status: 'Snack: ' + getRandomDish() + ' and ' + getRandomDish() }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

//schedule the tweets at mealtimes
var CronJob = require('cron').CronJob;

new CronJob('00 00 00 * * 0-6', function() {
  populateTweets()
  console.log('Tweets generated');
}, null, true, 'America/Los_Angeles');

new CronJob('00 15 07 * * 0-6', function() {
  tweetBreakfast();
  console.log('Breakfast tweeted');
}, null, true, 'America/Los_Angeles');

new CronJob('00 30 12 * * 0-6', function() {
  tweetLunch();
  console.log('Lunch tweeted');
}, null, true, 'America/Los_Angeles');

new CronJob('00 30 19 * * 0-6', function() {
  tweetDinner();
  console.log('Dinner tweeted');
}, null, true, 'America/Los_Angeles');
