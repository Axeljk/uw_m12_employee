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
	getEmplSize: () => query("SELECT COUNT(id) AS length FROM employees"),
	getRoleSize: () => query("SELECT COUNT(id) AS length FROM roles"),
	getdeptSize: () => query("SELECT COUNT(id) AS length FROM departments"),
	getDepts: () => query("SELECT id AS value, name FROM departments"),
	getRoles: () => query("SELECT \
		roles.id AS value, \
		title AS name, \
		departments.name AS department, \
		salary \
		FROM roles JOIN departments ON department_id = departments.id \
		ORDER BY departments.name ASC, title ASC"),
	getEmpls: () => query("SELECT \
			E1.id AS value, \
			CONCAT(E1.last_name, \", \", E1.first_name) AS name, \
			title, \
			departments.name AS department, \
			salary, \
			IFNULL(CONCAT(E2.last_name, \", \", E2.first_name), \"NULL\") AS manager \
			FROM employees E1 \
			LEFT JOIN employees E2 ON E1.manager_id = E2.id \
			INNER JOIN roles ON E1.role_id = roles.id \
			INNER JOIN departments ON department_id = departments.id \
			ORDER BY E1.last_name ASC"),
	getMan: () => {
		return query("SELECT id AS value, \
			CONCAT(last_name, \", \", first_name) AS name FROM employees")
		.then(results => {
			results.unshift({value: null, name: "[---N/A---]"})
			return results;
		});
	},
	displayDepts: () => query("SELECT id AS ID, name AS Name FROM departments"),
	displayRoles: () => query("SELECT \
		roles.id AS ID, \
		title AS Title, \
		name as Department, \
		LPAD(CONCAT(\"$\", FORMAT(salary, 0)), MAX(LENGTH(salary) - 1) OVER (), \" \") as Salary \
		FROM roles \
		INNER JOIN departments ON department_id = departments.id \
		ORDER BY name ASC, salary ASC"),
	displayEmpls: () => query("Select \
		E1.id AS ID, \
		CONCAT(E1.first_name, \" \", E1.last_name) AS Name, \
		title AS Title, \
		name AS Department, \
		LPAD(CONCAT(\"$\", FORMAT(salary, 0)), MAX(LENGTH(salary) - 1) OVER (), \" \") as Salary, \
		IFNULL(CONCAT(E2.first_name, \" \", E2.last_name), \"\") AS Manager \
		FROM employees E1 \
		LEFT JOIN employees E2 ON E1.manager_id = E2.id \
		INNER JOIN roles ON E1.role_id = roles.id \
		INNER JOIN departments ON department_id = departments.id \
		ORDER BY departments.name ASC, E1.last_name ASC"),
	addDept: (dept) => query("INSERT INTO departments \
		(name) VALUES (?)", [dept.deptName]),
	addRole: (role) => query("INSERT INTO roles \
		(title, salary, department_id) VALUES (?, ?, ?)",
		[role.roleName, role.roleSalary, role.roleDept]),
	addEmpl: (empl) => query("INSERT INTO employees  \
		(first_name, last_name, role_id, manager_id) VALUES	(?, ?, ?, ?)",
		[empl.emplFirst, empl.emplLast, empl.emplRole, empl.emplMan]),
	setRole: (empl) => query("UPDATE employees SET role_id = ? WHERE id = ?",
		[empl.updateRole, empl.updateName]),
	setMan: (empl) => query("UPDATE employees SET manager_id = ? WHERE id = ?",
		[empl.updateMan, empl.updateName]),
	delEntry: (table, entry) => query(`DELETE FROM ${table} WHERE id = ?`, [entry.id]),
	deptBudg: (dept) => query("SELECT \
		departments.id AS ID, \
		departments.name AS Department, \
		CONCAT(\"$\", FORMAT(SUM(salary), 0)) AS Budget \
		FROM employees INNER JOIN roles \
		ON role_id = roles.id AND roles.department_id = ? \
		INNER JOIN departments ON departments.id = ? ",
		[dept.id, dept.id])
}

module.exports = database;