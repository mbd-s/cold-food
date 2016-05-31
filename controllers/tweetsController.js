var db = require('../models');

function index(req, res) {
  db.Tweet.find({}, function(err, allTweets) {
    res.json(allTweets);
  });
}

module.exports = {
  index: index,
};
