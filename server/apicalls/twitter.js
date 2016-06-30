var OAuth = require('oauth-request');
var api_keys = require('../../api_keys');
var consumer_public = api_keys.consumerKey || process.env.TWITTERCK;
var consumer_secret = api_keys.consumerSecret || process.env.TWITTERCS;
var access_Token = api_keys.accessToken || process.env.TWITTERAT;
var accessTokenSecrets = api_keys.accessTokenSecret || process.env.TWITTERTS;

var twit = module.exports;



twit.gettweets = function (tweetnickname) {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return new Promise(function (fulfill, reject) {

        if (tweetnickname === '') {
            var err = "Twitter nickname does not exist";
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
            url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + tweetnickname,
            qs: {
                count: 5
            },
            json: true
        }, function (err, res, tweets) {
            if (err) { reject(err) }
            else {
                var returnedtweets = tweets.map(function (element) {
                    var datetime = new Date(element.created_at);
                    var day = datetime.getDate();
                    var monthdigit = datetime.getMonth();
                    var year = datetime.getFullYear();
                    var hours = datetime.getHours();
                    var am = 'AM';
                    if (hours > 12 ){
                        am = 'PM';
                        hours = hours-12;
                    }
                    var minutes = datetime.getMinutes().toString();
                    if (minutes.length < 2){
                        minutes = '0' + minutes; 
                    }

                    var obj = {};
                    obj.created_at = hours +':'+minutes+ am + ' - ' + day + ' ' + month[monthdigit] + ' ' + year;
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




