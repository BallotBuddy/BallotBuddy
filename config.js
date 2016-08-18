var path = require('path');

exports.configuration = function () {

    if (process.env.NODE_ENV !== 'production') {

        var config = {
            client: 'localhost:8080',
            database: {
                client: 'sqlite3',
                connection: {
                    filename: path.join(__dirname, '/server/database/database/database.db')
                }
            }
        };

        return config;
    }

    else {

        var config = {
            client: 'www.ballotbuddy.co',
            database: {
                client: 'pg',
                connection: process.env.DATABASE_URL
            }
        };

        return config;
    }

};



