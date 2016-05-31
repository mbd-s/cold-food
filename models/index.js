var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cold-food");

var Tweet = require('./tweet');

module.exports.Tweet = Tweet;
