# BallotBuddy


#Mac - Getting started
`npm install`

`npm run build`

`npm start`


#Windows - Getting started
`npm install webpack -g` (first time)
`npm install`
`webpack -w` (keep running)
`npm start` (run in 2nd terminal window)

Currently the project database rebuilds itself when an npm install is done as part of the process.
In order for this to work successfully, an environment key 'process.env.Candidate_key' needs to be set with a working key.

If a person does not want to do this and use the working database that is in the origin/main branch,
they can replace the following line  "postinstall": "node server/database/worker/dbgrabber.js && npm run build", with 
"postinstall": "npm run build", in the package.json file before running npm
 install. This step is highly suggested for 'development' mode folks to use as we have limited api key uses a day.  

 The above package.json line is necessary to push a new database to production and deployment.  

Because we are in a state of rapid development and changing api's.. I believe that of this merge, all
content that is viewable is 100% remote api delivered through the server. The database is currently 
like an appendix and not necessary for the site to do anything at the moment.

There is also a toggle that changes the domain name and type of database being used depending on 
development or production in the config.js file.  If you change the variable switcher to p for production, or d for development,
it changes everything automatically so that everything can work depending on where the package is being used.


  




