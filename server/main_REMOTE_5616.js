'use strict'

let express = require('express')
let path = require('path')
let app = express()

app.use(express.static(path.join(__dirname, "../dist")))

app.route('/recipes')
  .get(function(req,res){
    res.send(JSON.stringify(superAwesomeDB))
  })
  .all(function(req,res){
    res.send("Try using GET instead of POST")
  })

app.get('*', function(req, res){
  res.redirect('/')
})

app.listen(8080)
console.log("Listening on 8080\n\n GET: '/'  Get all recipes")
