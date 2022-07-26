const mysql = require('mysql2');

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "company_db"
});

// simple query
db.query("SELECT * FROM employees", (err, results, fields) => {
	console.log(results);
});

module.exports = db;