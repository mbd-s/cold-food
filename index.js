//website
var express = require('express');
var app = express();
//TODO allow CORS?
app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log('req = ', req);
  console.log('res = ', res);
  res.sendFile('views/index.html' , { root : __dirname});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('ColdFoodBot app listening at http://localhost:3000/');
});

//configure Twitter bot
require('dotenv').config();

var config = require('./config')

var Twit = require('twit');
var T = new Twit(config);
console.log('@ColdFoodBot is connected to Twitter.');

//read CSV data with baby parse
var Baby = require('babyparse');
filePath = "menu-data/Dish.csv";
parsed = Baby.parseFiles(filePath, {
  header: true
});
rows = parsed.data;

//Pick a random menu item
function getRandomDish() {
  var randomDishId = Math.floor(Math.random() * rows.length ) + 1;
  return rows[randomDishId].name;
}
//And make it available to the bot
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
