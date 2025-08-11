

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database : 'sys',
    password : 'Gg932300428+'
})

module.exports = pool.promise();