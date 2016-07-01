#BallotBuddy
[Ballotbuddy.co](http://www.ballotbuddy.co/) is a website for easily finding useful information about your elected officals (US only). Don't know all your representatives? Search by zip code to get a list of candidates up for election in your district, then click on their profiles to learn about their experience, sources of funding, position on issues, and more.

##Tech Stack
* React with Redux
* Node
* Express
* PostgreSQL with Knex (deployed) or SQLite3 (local build)

##Getting started (local build)

###Mac
1. Run `npm install`
2. Run `npm run build`
3. Run `npm start`
4. In a browser, go to `localhost:8080`
	* Note: Code changes will require re-running `npm start` before they show up in the browser

###Windows

1. Run `npm install webpack -g` (first time only)
2. Run `npm install` (first time only)
3. Run `webpack -w` (keep running)
4. Run `npm start` (run in 2nd terminal window)
5. In a browser, go to `localhost:8080`
	* Note: Code changes will automatically show up in the browser (after file is saved)

##Development & Production

###Development
* In config.js, ensure `switcher = 'd'`
* In package.json, ensure line 9 is `"postinstall": "npm run build",`

###Production
* In config.js, make `switcher = 'p'`
* In package.json change `"postinstall": "npm run build"` to `"postinstall": "node server/database/worker/dbgrabber.js && npm run build"`

Note: The major difference between development and production is the database used. Development uses SQLite3, while production uses postgres.
Because we are in a state of rapid development and changing API's.. I believe that of this merge, all content that is viewable is 100% remote API delivered through the server. The database is currently like an appendix and not necessary for the site to do anything at the moment.


##Updating the Database

To rebuild the database:
1. Set an environment key `process.env.Candidate_key` to a working opensecrets.org API key (free after signup)
2. In package.json, change `"postinstall": "npm run build"` to `"postinstall": "node server/database/worker/dbgrabber.js && npm run build"`
	* Note: opensecrets.org limits their API


##External APIs

postgres
DATABASE_URL = needs to be set for the deployment database. this is provided by the hosting provider.

opensecrets
OPENSECRETS = opensecrets api key.

Twitter
(You need all 4 of these from the twitter api in order for twitter feed to work.)
TWITTERAT = token
TWITTERCK = consumer key
TWITTERCS = consumer secret
TWITTERTS = token secret

votesmart api
VOTESMART

Youtube api
YOU_TUBE

##Key Endpoints
Note: Our endpoints use a mix of direct API calls (e.g. VoteSmart, Twitter) and data stored in our database. See the Source information for more details on a specific endpoint.

**Local Candidates (zip code search)**
<br>Route: `/candzip?zip=`
<br>Example: `http://www.ballotbuddy.co/candzip?zip=78701`
<br>Response format: 
<br>Source: VoteSmart API

**Candidate Bio (experience)**
<br>Route: `/candbio?candId=`
<br>Example: `http://www.ballotbuddy.co/candbio?candId=15723`
<br>Response format: 
<br>Source: VoteSmart API

**Sector Funding**
<br>Route: `/candSectorFunding?candId=`
<br>Example: `http://www.ballotbuddy.co/candSectorFunding?candId=N00000019`
<br>Response format: [ {industry: 'agriculture', funding: 123456}, ... ]
<br>Source: Stored in database, which is populated by OpenSecrets API

**Key Issues (i.e. Courage Survey)**
<br>Route: `/candCourageScore?candId=`
<br>Example: `http://www.ballotbuddy.co/candCourageScore?candId=N00000019`
<br>Response format: 
<br>Source: VoteSmart API

##Contribution Guidelines
Got an idea? Great! Create a new issue describing your update. Fork the repo and create a branch named 'feat#', where # is the issue number. When ready, put in a pull request to [master in this repo](https://github.com/BallotBuddy/BallotBuddy).

##Contributors
* Matt DuBose ([mjdubose](https://github.com/mjdubose)) - Back end and database
* James Lee ([JimmyLee87](https://github.com/JimmyLee87)) - Front end and styling
* Jack Hall ([jackjhall22](https://github.com/jackjhall22)) - Full Stack
* Ryan Newton ([ryannewton](https://github.com/ryannewton)) - Full Stack
