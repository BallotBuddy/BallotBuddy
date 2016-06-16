
var path = require('path')

exports.configuration = function ()
{

var environment = 'p';

if (environment = 'development') {

    var config = {
        client: 'localhost:8080',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/server/database/database/database.db')
            }
        }
    }


    return config;
}

if (environment = 'p') {


    var config = {
        client: 'ballotbuddy.herokuapp.com',
        database:  { client: 'pg',
         connection: process.env.DATABASE_URL
        }
      }
    return config;
}

}



