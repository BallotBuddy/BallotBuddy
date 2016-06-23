var rp = require('request-promise');
var _ = require('underscore');
var Promise = require('bluebird');

var api_Keys = require('../../api_keys');
var api_key = api_Keys.OPENSECRETS_API;
var opensecrets = module.exports;

opensecrets.candIndustry = function(cid) {
  console.log(cid);
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
     console.log("Successfully parsed industry contributor data:");
     console.log(jsres.response.industries.industry);
      return jsres.response.industries.industry.map(function (item) {
        var contributor = item['@attributes'];
        console.log('contributor object', contributor);
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
