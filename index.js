require('dotenv').config();

var config = require('./config')

var Twit = require('twit');
var T = new Twit(config);
console.log('@ColdFoodBot is connected to Twitter.');

// const fs = require('fs');
// fs.readFile('/Users/mbds/Desktop/data/Dish.csv', (err, data) => {
//   if (err) throw err;
//   console.log(data.toString().split('/n'));
// });

function tweetBreakfast(){
  //appending a random number so as not to run afoul of Twitter's duplicate-tweet spam filters
  var r = Math.floor(Math.random()*100);
  T.post('statuses/update', { status: r + ' Breakfast, Aboard SS Kamakura Maru: Queen olives, roast goose with apple sauce, and a small pastry' }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    }
    else {
      console.log(data);
    }
  });
}

function tweetLunch(){
  //appending a random number so as not to run afoul of Twitter's duplicate-tweet spam filters
  var r = Math.floor(Math.random()*100);
  T.post('statuses/update', { status: r + ' Lunch, Waldorf Astoria: Cotuit oysters, radishes, and trout' }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    }
    else {
      console.log(data);
    }
  });
}

function tweetDinner(){
  //appending a random number so as not to run afoul of Twitter's duplicate-tweet spam filters
  var r = Math.floor(Math.random()*100);
  T.post('statuses/update', { status: r + ' Dinner, Albany Club: English mutton broth, sherry, and cigars' }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    }
    else {
      console.log(data);
    }
  });
}

var CronJob = require('cron').CronJob;
new CronJob('00 00 07 * * 0-6', function() {
  tweetBreakfast();
  console.log('Breakfast tweeted');
}, null, true, 'America/Los_Angeles');

new CronJob('00 30 12 * * 0-6', function() {
  tweetLunch();
  console.log('Lunch tweeted');
}, null, true, 'America/Los_Angeles');

new CronJob('00 30 07 * * 0-6', function() {
  tweetDinner();
  console.log('Dinner tweeted');
}, null, true, 'America/Los_Angeles');
