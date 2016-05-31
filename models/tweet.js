var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
     status: String,
     isReady: Boolean
});

var Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
