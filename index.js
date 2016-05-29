require('dotenv').config();

var Twit = require('twit');

var config = require('./config')

var T = new Twit(config);
console.log('@ColdFoodBot is running on Twitter.');

const fs = require('fs');
fs.readFile('/Users/mbds/Desktop/data/MenuItem.csv', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

function tweetBreakfast(){
  //appending a random number so as not to run afoul of Twitter's duplicate-tweet spam filters
  var r = Math.floor(Math.random()*100);
  T.post('statuses/update', { status: r + ' Breakfast, May 27, 1916, Aboard SS Kamakura Maru: Queen olives, roast goose with apple sauce, and a small pastry' }, function(err, data, response) {
    if (err) {
      console.log ("There was an error: ", err);
    }
    else {
      console.log("Tweet tweeted");
      console.log(data);
    }
  });
}

//TODO write tweetLunch() and tweetDinner() functions
//TODO use setInterval or setTimeout to sched each function to be called once a day
tweetBreakfast();
setInterval(tweetBreakfast, 1000*60*60*8);
