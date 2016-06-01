var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/cold-food" );

var Tweet = require('./tweet');

module.exports.Tweet = Tweet;
