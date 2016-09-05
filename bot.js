//configure Twitter bot
require('dotenv').config();

var config = require('./config')
var db = require('./models');

var Twit = require('twit');
var T = new Twit(config);
console.log('@ColdFoodBot is connected to Twitter.');

function tweetMenu(){
var menu = fs.readFileSync('/Users/mbds/Desktop/cat.jpg', { encoding: 'base64' })
T.post('media/upload', { media_data: menu }, function (err, data, response) {
  var mediaIdStr = data.media_id_string
  var altText = "Historical menu from collection of NYPL."
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      var params = { status: 'Ferris Restaurant, 1948', media_ids: [mediaIdStr] }

      T.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    }
  })
})
}
tweetMenu();

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
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish()
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish()
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish()
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish()
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish()
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish()
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish()
    },
    {
      status: getRandomDish() + ', ' + getRandomDish() + ', and ' + getRandomDish()
    }
  ];

  db.Tweet.create(oneDayOfTweets, function(err, tweets){
    console.log("Tweets populated: ", tweets);
    if (err) { return console.log('There was an error: ', err); }
  });
}

//find a queued tweet, call the tweet function, and mark it as tweeted
var queueMeal = function() {
 db.Tweet.findOneAndUpdate({ 'isReady': true, 'isTweeted': false }, {$set: {'isTweeted': true}}, function (err, tweet) {
  if (err) {
    return console.log('There was an error: ', err);
  }
  tweetMeal(tweet);
  });
}

//tweet methods
function tweetMeal(tweet){
  T.post('statuses/update', { status: tweet.status }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    } else {
      console.log(data);
    }
  });
}

//populate tweets once a day
var CronJob = require('cron').CronJob;

new CronJob('00 00 05 * * 0-6', function() {
  populateTweets()
  console.log('Time to generate tweets!');
}, null, true, 'Europe/Berlin');

//tweet once every three hours
setInterval(function() {
  queueMeal();
}, 10800000);

//ping the site every 15 minutes to keep the dynos from idling
var http = require("http");
setInterval(function() {
    http.get("http://cold-food.herokuapp.com");
}, 900000);

//tweet once on initialization
// queueMeal();
