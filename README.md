## BallotBuddy
​
​
#Mac - Getting started
`npm install`
​
`npm run build`
​
`npm start`
​
​
​
#Windows - Getting started
`npm install webpack -g` (first time)
​
`npm install`
​
`webpack -w` (keep running)
​
`npm start` (run in 2nd terminal window)
​
​
​
#Development & Production
Development - In config.js, make `switcher = 'd'`
​
Production  - In config.js, make `switcher = 'p'`. Next, in package.json change `"postinstall": "npm run build"` to `"postinstall": "node server/database/worker/dbgrabber.js && npm run build"`
​
Note: The major difference between development and production is the database used. Development uses SQLite3, while production uses postgres.
Because we are in a state of rapid development and changing API's.. I believe that of this merge, all content that is viewable is 100% remote API delivered through the server. The database is currently like an appendix and not necessary for the site to do anything at the moment.
​
​
#Updating the Database
To rebuild the database:
1) Set an environment key `process.env.Candidate_key` to a working opensecrets.org API key (free after signup)
2) In package.json, change `"postinstall": "npm run build"` to `"postinstall": "node server/database/worker/dbgrabber.js && npm run build"`
Note: opensecrets.org limits their API




