var OAuth = require('oauth-request');
var api_keys = require('../../api_keys');
var consumer_public = api_keys.consumerKey ||process.env.TWITTERCK;
var consumer_secret = api_keys.consumerSecret || process.env.TWITTERCS;
var access_Token = api_keys.accessToken || process.env.TWITTERAT;
var accessTokenSecrets = api_keys.accessTokenSecret || process.env.TWITTERTS;

var twit = module.exports;

twit.gettweets = function (tweetnickname) {
    return new Promise(function (fulfill, reject) {

 if (tweetnickname==='')
 { var err ="Twitter nickname does not exist";
     throw "Twitter nickname does not exist";
 }
        var twitter = OAuth({
            consumer: {
                public: consumer_public,
                secret: consumer_secret
            }
        });

        twitter.setToken({
            public: access_Token,
            secret: accessTokenSecrets
        });

        twitter.get({
            url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+tweetnickname,
            qs: {
                count: 5
            },
            json: true
        }, function (err, res, tweets) {
            if (err) { reject(err) }
            else {
                var returnedtweets = tweets.map(function (element) {
                    var obj = {};
                    obj.created_at = element.created_at;
                    obj.text = element.text;
                    obj.user = element.user.name;
                    obj.location = element.user.location;
                    obj.followers = element.user.followers_count;
                    obj.url = element.user.url;
                    return obj;
                });
                fulfill(returnedtweets)
            };
        })
    })

};




