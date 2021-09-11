const Pool = require('pg').Pool
const pool = new Pool({
    user: 'api_user',
    host: 'localhost',
    database: 'dogid_api',
    password: 'dK9Vfg#RMrpD',
    port: 5432,
})

module.exports = {
    pool
}