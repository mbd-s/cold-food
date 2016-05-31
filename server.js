var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var ejs = require('ejs');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

var controllers = require('./controllers');

//TODO add basic auth

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/tweets', controllers.tweets.index);
app.get('/tweets/:tweetId', controllers.tweets.show);
app.delete('/:tweetId', controllers.tweets.destroy);
app.put('/tweets/:tweetId', controllers.tweets.update);

// app.get('/templates/:name', controllers.tweets.templates);

app.get('*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('ColdFoodBot app listening at http://localhost:3000/');
});
