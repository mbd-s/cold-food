var db = require('./models');

var tweets_list = [
  {
    status: "Breakfast: Terrine of Duckling, Marie Stuart; Half Cold Lobster, Mayonnaise; and Roast veal",
    meal: "breakfast"
  },
  {
    status: "Lunch: Crab Meat à la Dewey; Whitefish, Bernaise sauce; and Apfel-Pfannkuchen",
    meal: "lunch"
  },
  {
    status: "Dinner: Fried Filet of Sole, Tartare Sauce; Brandied Peaches; and Broiled Capon (half)",
    meal: "dinner"
  },
  {
    status: "Snack: Boiled Halibut, lobster sauce and Pescado Sherry (dry and delicate)",
    meal: "snack"
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
