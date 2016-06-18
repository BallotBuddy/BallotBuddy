var rp = require('request-promise');
var _ = require('underscore');
var Promise = require("bluebird");


var votesmart = module.exports;


votesmart.checkPhoto = function (url) {
  var photo = {
    uri: url,
    qs: {

    },
    headers: { 'User-Agent': 'request-promise' },

  };
  return votesmart.checkPhotoStatus(photo);

}

votesmart.checkPhotoStatus = function (photo) {
  return rp(photo)
    .then(function (res) {
      return true;
    })
    .catch(function (err) {
      return false;
    })
}


// Promise.map(fileNames, function(fileName) {
//     // Promise.map awaits for returned promises as well.
//     return fs.readFileAsync(fileName);
// }).then(function() {
//     console.log("done");
// });

votesmart.collectCandidatesByZip = function (zip) {
  //
  // Query info for Votesmart API = get candidates by zip
  //
  var candidates = {
    uri: 'http://api.votesmart.org/Candidates.getByZip?zip5=' + zip + '&o=JSON',
    qs: {
      key: 'f4f8f4595fdf4d3773aee9e02da81f2b'                      //process.env.Candidate_key
    },
    headers: { 'User-Agent': 'request-promise' },
    json: true,
  };
  return votesmart.fetch(candidates);
}

votesmart.fetch = function (request) {
  return rp(request)
    .then(function (res) {
      console.log("Successfully fetched candidate info");
      return (res);
    })
    .catch(function (err) {
      console.log("Failed to fetch candidate info: ", err.message);
    })
    .then(function (jsres) {
      var candidateList = jsres.candidateList.candidate;
      candidateList = Promise.map(candidateList,function (candidate) {
          var pictureUrl = 'http://d229l5sflpl9cp.cloudfront.net/canphoto/' + candidate.candidateId + '.jpg';
          return votesmart.checkPhoto(pictureUrl)
            .then(function (result) {
              if (result) {
                candidate.picture = pictureUrl;
              }
              else {
                candidate.picture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJwKOmAFsBQJdt7ohopn5GJ4s6SXft9ovC-fhU9QuRZABGNwt';
              }
              return candidate;
            })
        });
      return candidateList;
    });
}



votesmart.collectCandidateDetails = function (candid) {
  var options = {
    uri: 'http://api.votesmart.org/CandidateBio.getBio?candidateId=' + candid + '&o=JSON',
    qs: {
      key: 'f4f8f4595fdf4d3773aee9e02da81f2b',  //process.env.Candidate_key
    },
    headers: { 'User-Agent': 'request-promise' },
    json: true,
  };
  return votesmart.fetchBio(options);
}

votesmart.fetchBio = function (request) {
  return rp(request)
    .then(function (res) {
      console.log("Successfully fetched candidate bio info");
      return (res);
    })
    .catch(function (err) {
      console.log("Failed to fetch candidate bio info: ", err.message);
    })
    .then(function (candidate) {
      candidate = candidate.bio;

      var returnedCandidate = {};
      returnedCandidate.candidate = candidate.candidate;
      returnedCandidate.election = candidate.election;
      //  console.log(returnedCandidate);
      return returnedCandidate;
    });
}

