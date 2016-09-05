## @coldfoodbot (Cold Food Bot)

###A Twitter bot tweeting century-old meals every three hours. Data comes from @nypl's ['What's on the Menu?'](http://menus.nypl.org/) collection. (This bot isn't associated with the library, though.)

---

[Twitter](twitter.com/coldfoodbot)

[GitHub](https://github.com/mbd-s/cold-food)


---

####Technologies

JavaScript

Node.js

Angular

Express

MongoDB

Mongoose

Bootstrap

Heroku

---

####Instructions


To run your own bot, start by cloning this repo and installing the dependencies:

`$ npm install`

 You'll need to get your own keys to connect to Twitter. Sign up for a new Twitter account and [register an app](https://dev.twitter.com/) for it. Click the "Keys and Access Tokens" tab and click "Generate Consumer Key and Secret." Note your Consumer Key, Consumer Secret, Access Token, and Access Token Secret—you'll need to replace the placeholders in `config.js` with these. (Make sure to hide them if you're using GitHub.) To run the bot:

`$ node bot.js`


**Dependencies:**

node

npm

babyparse

body-parser

connect-wwwhisper

cron

dotenv

ejs

express

mongoose

twit
