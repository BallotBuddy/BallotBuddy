var rp = require('request-promise');
var _ = require('underscore');
var Promise = require('bluebird');

var api_Keys = require('../../api_keys');
var api_key = api_Keys.OPENSECRETS_API;
var opensecrets = module.exports;
var db = require('../database/database/db');
var _ = require('underscore');
var PromiseThrottle = require('promise-throttle');

opensecrets.checkstashreturn = function(cid){

 return db.queryFunding(cid).then(function(data){
    console.log(data);
   if (data.length === 0){
      return opensecrets.candIndustry(cid)
      .then(function(results){
              console.log(results);
              return results;
      })

   }
   else {
     return data;
   }
    })
  }

opensecrets.candIndustry = function(cid) {
  var industries = {
    uri: 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&cycle=2016&output=json',
    qs: {
      apikey: api_key || process.env.OPENSECRETS
    },
    headers: { 'User-Agent': 'request-promise' },
    json: true
  };
  return opensecrets.fetch(industries);
}

opensecrets.fetch = function (request) {
  return rp(request)
    .then(function (res) {
      console.log("Successfully fetched candidate's top contributors by industry");
      return (res);
    })
    .then(function (jsres) {
     console.log("Successfully parsed industry contributor data");
      return jsres.response.industries.industry.map(function (item) {
        var contributor = item['@attributes'];
        return contributor;
      });
    })
    .catch(function (err) {
     console.log("Failed to fetch candidate's industry contributor info: ", err.message);
      var obj = [{
        industry_code: '',
        industry_name: '',
        indivs: '',
        pacs: '', 
        total: ''
      }];
      return (obj);
    })
};
