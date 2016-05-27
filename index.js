require('dotenv').config();

var Twit = require('twit');

var config = require('./config')

var T = new Twit(config);
console.log('@ColdFoodBot is running on Twitter.');

//sample search
// T.get('search/tweets', { q: 'menus', lang: 'en', count: 10 }, function(err, data, response) {
//   var tweets = data.statuses;
//   for (var i = 0; i < tweets.length; i++) {
//     console.log(tweets[i].text)
//   }
// });

T.post('statuses/update', { status: 'The food is getting cold' }, function(err, data, response) {
  if (err) {
    console.log ("There was an error: ", err);
  }
  else {
    console.log("Tweet tweeted");
    console.log(data);
  }
});
