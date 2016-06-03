var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
     status: String,
     meal: String,
     isTweeted: {type: Boolean, default: false}
});

var Tweet = mongoose.model('Tweet', TweetSchema);
module.exports = Tweet;
