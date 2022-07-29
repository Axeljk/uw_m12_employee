const database = require("./queryUtil");

const QUESTIONS = {
	KEYS: {
		VIEW_EMPL: "View Employees",
		ADD_EMPL: "Add Employee",
		EMPL_ROLE: "Update Employee's Role",
		EMPL_MAN: "Update Employee's Manager",
		VIEW_ROLE: "View All Roles",
		ADD_ROLE: "Add Role",
		VIEW_DEPT: "View All Departments",
		ADD_DEPT: "Add Department",
		DEL_DEPT: "Delete Department",
		DEL_ROLE: "Delete Role",
		DEL_EMPL: "Delete Employee",
		DEPT_BUDG: "Department Budget",
		QUIT: "Quit"
	},
	menu: [{
		type: "list",
		choices: () => Object.values(QUESTIONS.KEYS),
	//	pageSize: 13,
		name: "selection"
	}],
	newEmpl: [{
		type: "input",
		message: "Employee first name:",
		name: "emplFirst"
	},
	{
		type: "input",
		message: "Employee last name:",
		name: "emplLast"
	},
	{
		type: "list",
		message: "Employee's role:",
		choices: database.getRoles,
		name: "emplRole"
	},
	{
		type: "list",
		message: "Employee's manager:",
		choices: database.getMan,
		name: "emplMan"
	}],
	updateEmpl: [{
		type: "list",
		message: "Update which employee:",
		choices: database.getEmpls,
		name: "updateName"
	},
	{
		type: "list",
		message: "Employee's new role:",
		choices: database.getRoles,
		name: "updateRole"
	}],
	updateMan: [{
		type: "list",
		message: "Update which employee:",
		choices: database.getEmpls,
		name: "updateName"
	},
	{
		type: "list",
		message: "Employee's new manager:",
		choices: database.getMan,
		name: "updateMan"
	}],
	newRole: [{
		type: "input",
		message: "Name of role:",
		name: "roleName"
	},
	{
		type: "input", // "number" doesn't let you delete NaN.
		message: "Salary of role:",
		name: "roleSalary",
		validate: (answer) => /^\d+$/.test(answer) // Any number of numbers.
	},
	{
		type: "list",
		message: "Department of role:",
		choices: database.getDepts,
		name: "roleDept"
	}],
	newDept: [{
		type: "input",
		message: "Name of department:",
		name: "deptName"
	}],
	delDept: [{
		type: "list",
		message: "Department to delete:",
		choices: database.getDepts,
		name: "id"
	}],
	delRole: [{
		type: "list",
		message: "Role to delete:",
		choices: database.getRoles,
		name: "id"
	}],
	delEmpl: [{
		type: "list",
		message: "Employee to delete:",
		choices: database.getEmpls,
		name: "id"
	}],
	deptBudg: [{
		type: "list",
		message: "Department's budget to view:",
		choices: database.getDepts,
		name: "id"
	}]
};

module.exports = QUESTIONS;