var db = require('./models');

var tweets_list = [
  {
  status: "Breakfast: Braised Sweet Potatoes",
  ready: true
  },
  {
  status: "Lunch: Oyster Crumb Fry",
  ready: true
  },
  {
  status: "Grand Saddle of Spring Lamb a la Broche",
  ready: false
  }
];

db.Tweet.remove({}, function(err, tweets){
  if(err) {
    console.log('Error removing tweets: ', err);
  } else {
    console.log('Removed all tweets');

    db.Tweet.create(tweets_list, function(err, tweets){
      if (err) { return console.log('Error: ', err); }
      console.log("Created", tweets.length, "tweets");
      process.exit();
    });
  }
});
