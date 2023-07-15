const { Pool } = require('pg');

//pg uri

const PG_URI = 'client input';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
}


// psql -d <url from elephantSQL> -f googleapi_postgres_create.sql

// This will open the connection to your database and execute the SQL statements that will create tables in your 
// database and populate them with rows of data. Make sure you let the script run all the way through. It will take a minute or two.

// -d dbname
// --dbname=dbname
// Specifies the name of the database to connect to. This is equivalent to specifying dbname as the first non-option argument on the command line. The dbname can be a connection string. If so, connection string parameters will override any conflicting command line options.



