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

const database = {
	getDepts: () => query("SELECT id AS ID, name AS Name FROM departments"),
	getRoles: () => query("SELECT \
							roles.id AS ID, \
							title AS Title, \
							name as Department, \
							LPAD(CONCAT(\"$\", FORMAT(salary, 2)), 13, \" \") as Salary \
							FROM roles \
							INNER JOIN departments ON department_id = departments.id"),
	getEmpls: () => query("Select \
							E1.id AS ID, \
							CONCAT(E1.first_name, \" \", E1.last_name) AS Name, \
							title AS Title, \
							name AS Department, \
							LPAD(CONCAT(\"$\", FORMAT(salary, 2)), 13, \" \") as Salary, \
							IFNULL(CONCAT(E2.first_name, \" \", E2.last_name), \"NULL\") AS Manager \
							FROM employees E1 \
							LEFT JOIN employees E2 ON E1.manager_id = E2.id \
							INNER JOIN roles ON E1.role_id = roles.id \
							INNER JOIN departments ON department_id = departments.id")
}

module.exports = database;