var db = require('../models');

// function templates(req, res) {
//   var name = req.params.name;
//   res.render('templates/' + name);
// }

function index(req, res) {
  db.Tweet.find({}, function(err, allTweets) {
    res.json(allTweets);
  });
}

function show(req, res) {
  db.Tweet.findById(req.params.tweetId, function(err, foundTweet) {
    if(err) { console.log('tweetsController.show error', err); }
    console.log('tweetsController.show responding with', foundAlbum);
    res.json(foundTweet);
  });
}

function destroy(req, res) {
  db.Tweet.findOneAndRemove({ _id: req.params.tweetId }, function(err, foundTweet){
    res.json(foundTweet);
  });
}

function update(req, res) {
  console.log('updating with data', req.body);
  db.Tweet.findById(req.params.tweetId, function(err, foundTweet) {
    if(err) { console.log('tweetsController.update error', err); }
    foundTweet.status = req.body.status;
    foundTweet.ready = req.body.ready;
    foundTweet.save(function(err, savedTweet) {
      if(err) { console.log('Saving updated tweet failed.'); }
      res.json(savedTweet);
    });
  });

}

module.exports = {
  index: index,
  show: show,
  destroy: destroy,
  update: update
};
