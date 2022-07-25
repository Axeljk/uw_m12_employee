const KEYWORDS = ["View Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];
const [KEY_VIEW_EMPL, KEY_ADD_EMPL, KEY_EMPL_ROLE, KEY_VIEW_ROLE, KEY_ADD_ROLE, KEY_VIEW_DEPT, KEY_ADD_DEPT, QUIT] = KEYWORDS;

const QUESTIONS = {
	menu: [{
		type: "list",
		choices: KEYWORDS,
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
		name: "emplRole"
	},
	{
		type: "list",
		message: "Employee's manager:",
		name: "emplMan"
	}],
	updateEmpl: [{
		type: "list",
		message: "Update which employee:",
		name: "updateName"
	},
	{
		type: "list",
		message: "Employee's new role:",
		name: "updateRole"
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
		name: "roleDept"
	}],
	newDept: [{
		type: "input",
		message: "Name of department:",
		name: "deptName"
	}]
};

module.exports = { KEYWORDS, QUESTIONS };