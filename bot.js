//configure Twitter bot
require('dotenv').config();

var config = require('./config')

var Twit = require('twit');
var T = new Twit(config);
console.log('@ColdFoodBot is connected to Twitter.');

//TODO seed task or module
//read CSV data with babyparse
var Baby = require('babyparse');
filePath = "menu-data/Dish.csv";
parsed = Baby.parseFiles(filePath, {
  header: true
});
rows = parsed.data;


//Pick a random menu item
function getRandomDish() {
  var randomDishId = Math.floor(Math.random() * rows.length ) + 1;
  var foundDish = rows[randomDishId].name;
  console.log(foundDish, foundDish.length);
  if (foundDish.length > 40) {
    console.log("Dish is too long for Twitter. Retrying!");
    getRandomDish();
  } else {
      console.log("Found a dish!", foundDish);
      return foundDish;
  }
}

// And make it available to the bot
var randomDish = getRandomDish();
console.log(randomDish);


//bot methods
//TODO add multiple unique items
//TODO make sure dishes are normalized
//TODO check against character limit; retry if too long
function tweetBreakfast(){
  T.post('statuses/update', { status: 'Breakfast: ' + randomDish }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    }
    else {
      console.log(data);
    }
  });
}

function tweetLunch(){
  T.post('statuses/update', { status: 'Lunch: ' + randomDish }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    }
    else {
      console.log(data);
    }
  });
}

function tweetDinner(){
  T.post('statuses/update', { status: 'Dinner: ' + randomDish }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    }
    else {
      console.log(data);
    }
  });
}

//schedule the tweets at mealtimes
var CronJob = require('cron').CronJob;
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
