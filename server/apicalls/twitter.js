var OAuth = require('oauth-request');
var api_keys = require('../../api_keys');
var consumer_public = api_keys.consumerKey;
var consumer_secret = api_keys.consumerSecret;
var access_Token = api_keys.accessToken;
var accessTokenSecrets = api_keys.accessTokenSecret;




var twit = module.exports;

twit.gettweets = function (tweetnickname) {

    // function readFilePromise() {
    //     return new Promise(function(fulfill, reject) {
    //         fs.readFile(path, function(error, content) {
    //             if (error) reject(error)
    //             else fulfill(content);
    //         })
    //     })
    // }   

    return new Promise(function (fulfill, reject) {


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
            url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=RepPaulCook',
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




