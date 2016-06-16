
var path = require('path')

exports.configuration = function ()
{

var environment = 'production';

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

if (environment = 'production') {


    var config = {
        client: 'ballotbuddy.herokuapp.com',
        database: process.env.DATABASE_URL

    }
    return config;
}

}



