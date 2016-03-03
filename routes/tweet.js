require('dotenv').config();
var express = require('express');
var router = express.Router();
var Twit = require('twit');var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var tweets = []

router.route('/:keyword')
	.get(function(req, res){
		var keyword = req.params.keyword;
		T.get('search/tweets', { q: keyword + ' since:2016-02-11', count: 100 }, function(err, data, response) {
      console.log('TRYING TO GET DATA', data);
  			var arrSatauses = data.statuses;
  			var tweetsArr = arrSatauses.map( function(tweet) {
  				return { 
  					text: tweet.text,
  					image: tweet.image,
  					screen_name: tweet.user.screen_name,
  					created_at: tweet.created_at,
  					profile_image_url: tweet.user.profile_image_url,
            hashtags: tweet.entities.hashtags.map((hashObj) => '#' + hashObj.text).join('  '),
            urls: tweet.entities.urls.map((urlObj) => urlObj.url ),
					}  				
  				});
  			res.json(tweetsArr);
		})
	});

module.exports = router;