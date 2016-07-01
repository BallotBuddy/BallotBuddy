'use strict'
let Server = require('../client/server.js')
let express = require('express')
let path = require('path')
let app = Server.app();
let db = require('./database/database/db')
let vs = require('./apicalls/votesmart');
let os = require('./apicalls/opensecrets');
let twit = require('./apicalls/twitter');
let YTSearch = require('youtube-api-search')
let api_keys = require('../api_keys.js')
var Promise = require('bluebird');
let api_key = api_keys.YOUTUBE_API  || process.env.YOU_TUBE;

app.use('/', express.static(path.join(__dirname, "../dist")))

app.route('')

//http://localhost:8080/candid?id=N00009920
app.route('/candid')
  .get(function (req, res) {
    var id = req.query.id;

    db.queryByCandId(id).then(function (results) {
      res.status(200).send(results);
    });
  })

//http://localhost:8080/candyoutube?term=Clinton
app.route('/candyoutube')
.get(function(req,res){
var searchstring = req.query.term;
YTSearch({key: api_key, term: searchstring +' Official Campaign Video' }, (videos) => {       
      res.status(200).send( {       
				videos: videos,
				selectedVideo: videos[0]
			});
		})   
})

//http://localhost:8080/candname?name=ROBERT
app.route('/candname')
  .get(function (req, res) {
    var searchString = req.query.name;
    db.queryCandidate()
      .then(function (results) {
        var newArray = results.filter(function (candidate) {
          return candidate.candidate_firstlast.includes(searchString);
        })
        res.status(200).send(newArray);
      })
  })

  //http://localhost:8080/candtwitter?candtwitternickname=RepByrne
app.route('/candtwitter')
.get(function(req,res){
  var candidatenickname =req.query.candtwitternickname;
    twit.gettweets(candidatenickname).then(function(results){
      res.status(200).send(results);
    }).catch(function(error){
      console.log(error);
       var obj = {};
                    obj.created_at = '';
                    obj.text = '';
                    obj.user = '';
                    obj.location = '';
                    obj.followers = '';
                    obj.url = '';

                    var array=[];
                    array.push(obj);
                  res.status(200).send(array);
    })


})
//http://localhost:8080/candstate?state=TX
app.route('/candstate')
  .get(function (req, res) {
    var canstate = req.query.state;
    db.getCandByState(canstate).then(function (results) {
      res.status(200).send(results);
    })
  })

//http://localhost:8080/candCourageScore?candId=....
app.route('/candCourageScore').get(function(req,res) {
  var canId = req.query.candId;
  vs.fetchCourageScore(canId).then(function (results) {
    res.status(200).send(results);
  })
})

//http://localhost:8080/candzip?zip=96007
app.route('/candzip').get(function (req, res) {
  var canzip = req.query.zip;
  vs.collectCandidatesByZip(canzip).then(function (results) {
    res.status(200).send(results);
  })
})

//http://localhost:8080/candCampAddress?candId=15723
app.route('/candCampAddress').get(function (req, res) {
  var CampAddress = req.query.candId;
  vs.getCandidateCampaignAddress(CampAddress).then(function (results) {
    res.status(200).send(results);
  })
})

//http://localhost:8080/candbio?candId=15723
app.route('/candbio').get(function (req, res) {
  var candbio = req.query.candId;
  vs.collectCandidateDetails(candbio).then(function (results) {
    res.status(200).send(results);
  })
})

//http://localhost:8080/candwebaddress?candId=15723
app.route('/candwebaddress').get(function (req, res) {
  var candweb = req.query.candId;
  vs.getCandidateWebAddress(candweb).then(function (results) {
    res.status(200).send(results);
  })
})

//http://localhost:8080/candlastname?lastname=Trump
app.route('/candlastname').get(function (req, res) {
  var candname = req.query.lastname;
  vs.getCandidatesByLastName(candname).then(function (results) {
    res.status(200).send(results);
  })
})

//http://localhost:8080/candVoteSmartId?votesmart_id=...
app.route('/candVoteSmartId').get(function(req, res) {
  var candId = req.query.votesmart_id;
  db.queryByVoteSmartId(candId).then(function(results) { 
    res.status(200).send(results);
  })
})

//http://localhost:8080/candSectorFunding?candId=N00000019 
// Returns an array that looks like:
// [ {industry: 'agriculture', funding: 123456},
//   {industry: 'transportation', funding: 500000}]

app.route('/candSectorFunding').get(function(req, res){
  var candId = req.query.candId;
 return os.checkStashReturn(candId).then(function(results) {
   var obj = results.reduce((acc, elem) => {
	if(acc[elem.sector] === undefined) {
		acc[elem.sector] = elem.funding;
	} else {
		acc[elem.sector] += elem.funding;
	}
	return acc;
}, {});

var result = [];
for( var key in obj ) { 
	result.push({sector: key, funding: obj[key]});
}
    res.status(200).send(result);
  })
})

//http://localhost:8080/searches - returns them all
app.route('/searches')
  .get(function (req, res) {
    db.queryCandidate()
      .then(function (results) {
        res.status(200).send(results);
      })
  })
  .all(function (req, res) {
    res.send("Try using GET instead of POST")
  })

app.listen(process.env.PORT || 8080)
console.log('app started... 8080 if localhost');
