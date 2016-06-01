var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
     status: String,
     isReady: {type: Boolean, default: false}
});

var Tweet = mongoose.model('Tweet', TweetSchema);
module.exports = Tweet;
