'use strict'
let Server = require('./client/server.js')
let express = require('express')
let path = require('path')
let app = Server.app();
let db = require('./database/database/db')

app.use(express.static(path.join(__dirname, "../dist")))

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
//http://localhost:8080/candstate?state=TX
app.route('/candstate')
  .get(function (req, res) {
    var canstate = req.query.state;
    db.getCandByState(canstate).then(function (results) {
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

app.get('*', function (req, res) {
  res.redirect('/')
})

app.listen(process.env.PORT||8080)
console.log('listening on 8080');
