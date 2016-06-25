'use strict'
let Server = require('../client/server.js')
let express = require('express')
let path = require('path')
let app = Server.app();
let db = require('./database/database/db')
let vs = require('./apicalls/votesmart');
let os = require('./apicalls/opensecrets');
let twit = require('./apicalls/twitter');

app.use('/', express.static(path.join(__dirname, "../dist")))

//http://localhost:8080/candid?id=N00009920
app.route('/candid')
  .get(function (req, res) {
    var id = req.query.id;

    db.queryByCandId(id).then(function (results) {
      res.status(200).send(results);
    });
  })

//http://localhost:8080/candname?name=ROBERT
app.route('/candname')
  .get(function (req, res) {
    var searchString = req.query.name;
    db.queryCandidate()
      .then(function (results) {
        var newArray = results.filter(function (candidate) {
          //console.log(candidate.candidate_firstlast);
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
    console.log(results);
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

//http://localhost:8080/candIndustryContributors?candId=
app.route('/candIndustryContributors').get(function(req, res){
  var candId = req.query.candId;
  os.candIndustry(candId).then(function(results) {
    res.status(200).send(results);
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
