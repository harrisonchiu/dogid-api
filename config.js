const Pool = require('pg').Pool
let pool
let environment

/**
 * Setting up PostgreSQL database connection
 * There are different parameters based on environment
 * Development environment (using localhost) connects to own local database
 * Production environment (Heroku app) connects to Heroku's database
 * environment.js is a local file only and is to **not** be pushed
 * It is for development use only, so its absence implies production environment
 */
try {
    var {
        NODE_ENV,
        DB_USER,
        DB_PASSWORD,
        DB_DATABASE,
        DB_HOST,
        DB_PORT,
    } = require('./environment')
    environment = NODE_ENV
} catch (exception) {
    console.log(exception)
    console.log('[INFO] environment.js file does not exist')
    console.log('[INFO] Running as production environment')
    environment = 'production'
}


if (environment === 'development') {
    pool = new Pool({
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        port: DB_PORT,
    })
} else if (environment === 'production') {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    console.log('[ERROR] Could not determine environment type correctly')
    throw new Error('Something went wrong with connecting to database')
}


module.exports = {
    pool,
    environment,
}