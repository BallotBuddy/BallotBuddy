#BallotBuddy
[Ballotbuddy.co](http://www.ballotbuddy.co/) is a website for easily finding useful information about your elected officals (US only).
<br>Don't know all your representatives? Search by zip code to get a list of candidates up for election in your district, then click on their profiles to learn about their experience, sources of funding, position on issues, and more.

##Tech Stack
* React with Redux
* Node
* Express
* PostgreSQL with Knex (deployed) or SQLite3 (local build)

##Installation (local build)

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

Note: The key difference between development and production is the database used - development uses SQLite3, while production uses postgres.


##Database Notes

###Rebuild
1. Set an environment key `process.env.Candidate_key` to a working opensecrets.org API key (free after signup)
2. In package.json, change `"postinstall": "npm run build"` to `"postinstall": "node server/database/worker/dbgrabber.js && npm run build"`
	* Note: opensecrets.org limits their API


##External API Keys
Our code relies on several APIs for information. To run the code with full functionality, you will need to get several keys in order to access these APIs.

###Development variables (local build)
Within the `api_keys.js` file:

**VoteSmart API** ($45 annual fee)
<br>`VOTESMART_API` = VoteSmart API key

**OpenSecrets**
<br>`OPENSECRETS_API` = opensecrets api key

**Twitter** (All 4 required)
<br>`accessToken` = token
<br>`consumerKey` = consumer key
<br>`consumerSecret` = consumer secret
<br>`accessTokenSecret` = token secret

**Youtube API**
<br>`YOUTUBE_API` = Youtube API key

###Deployment environment variables
Within the hosting provider's enivornment variables:
<br>**Postgres** setup
<br>`DATABASE_URL` needs to be set for the deployment database as an environment variable. This should be provided by the hosting provider.

**VoteSmart API** ($45 annual fee)
<br>`VOTESMART`= VoteSmart API key

**OpenSecrets**
`OPENSECRETS` = opensecrets api key.

**Twitter** (All 4 required)
<br>`TWITTERAT` = token
<br>`TWITTERCK` = consumer key
<br>`TWITTERCS` = consumer secret
<br>`TWITTERTS` = token secret

**Youtube API**
<br>`YOU_TUBE` = Youtube API key


##Notable Endpoints
Note: Our endpoints use a mix of direct API calls (e.g. VoteSmart, Twitter) and data stored in our database. See the Source information for more details on a specific endpoint.

**Local Candidates (zip code search)**
<br>Route: `/candzip?zip=`
<br>Example: `http://www.ballotbuddy.co/candzip?zip=78701`
<br>Response format: `[{ candidateId: "55463", firstName: "Hillary", nickName: "", middleName: "Rodham", preferredName: "Hillary", lastName: "Clinton", ...}, {...}, ... ]`
<br>Source: VoteSmart API

**Candidate Bio (experience)**
<br>Route: `/candbio?candId=`
<br>Example: `http://www.ballotbuddy.co/candbio?candId=15723`
<br>Response format: `{ candidate: {candidateId: "15723", crpId: "N00023864",...}, election: {office: "President", officeType: "Presidential",...} }`
<br>Source: VoteSmart API

**Sector Funding**
<br>Route: `/candSectorFunding?candId=`
<br>Example: `http://www.ballotbuddy.co/candSectorFunding?candId=N00000019`
<br>Response format: `[ {industry: 'agriculture', funding: 123456}, ... ]`
<br>Source: Stored in database, which is populated by OpenSecrets API

**Key Issues (i.e. courage survey)**
<br>Route: `/candCourageScore?candId=`
<br>Example: `http://www.ballotbuddy.co/candCourageScore?candId=N00000019`
<br>Response format: `{ npat: {candidate: "Donald J. Trump", candidateId: "15723",...} }`
<br>Source: VoteSmart API

##Contribution Guidelines
Got an idea? Great! Create a new issue describing your update, then fork the repo and create a branch named `feat#`, where `#` is the issue number. When ready, put in a pull request to [master in this repo](https://github.com/BallotBuddy/BallotBuddy).

##Contributors
* Matt DuBose ([mjdubose](https://github.com/mjdubose)) - Back end and database
* James Lee ([JimmyLee87](https://github.com/JimmyLee87)) - Front end and styling
* Jack Hall ([jackjhall22](https://github.com/jackjhall22)) - Full Stack
* Ryan Newton ([ryannewton](https://github.com/ryannewton)) - Full Stack
