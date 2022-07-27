const util = require('util');
const tables = require("console.table");
const mysql = require('mysql2');

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "company_db"
});

// node native promisify
const query = util.promisify(db.query).bind(db);

async function getDepts() {
	const bob = await query("SELECT * FROM departments");
	let depts = tables.getTable(bob);
	console.log(depts);
}

function getRoles(dept) {
	if (dept == undefined || typeof dept != "number")
		return db.query("SELECT * FROM roles");
	else
		return db.query(`SELECT title FROM roles WHERE department_id = ${dept}`)
}

module.exports = { getDepts, getRoles, query };