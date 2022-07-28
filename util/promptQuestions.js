const KEYWORDS = ["View Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];
const [KEY_VIEW_EMPL, KEY_ADD_EMPL, KEY_EMPL_ROLE, KEY_VIEW_ROLE, KEY_ADD_ROLE, KEY_VIEW_DEPT, KEY_ADD_DEPT, QUIT] = KEYWORDS;
const database = require("./queryUtil");

const QUESTIONS = {
	menu: [{
		type: "list",
		choices: () => {
			let options = [KEY_ADD_DEPT, QUIT];

//			if (DEPT.length > 0) {
				options.unshift(KEY_VIEW_DEPT);
				options.unshift(KEY_ADD_ROLE);
//			}
//			if (ROLE.length > 0)
				options.unshift(KEY_VIEW_ROLE);
//			if (ROLE.length > 0 && EMPL.length > 0)
				options.unshift(KEY_EMPL_ROLE);
//			if (DEPT.length > 0 && ROLE.length > 0 && EMPL.length > 0)
				options.unshift(KEY_ADD_EMPL);
//			if (EMPL.length > 0)
				options.unshift(KEY_VIEW_EMPL);

			return options;
		},
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
		choices: database.getEmployees,
		name: "emplMan"
	}],
	updateEmpl: [{
		type: "list",
		message: "Update which employee:",
		choices: database.getEmployees,
		name: "updateName"
	},
	{
		type: "list",
		message: "Employee's new role:",
		choices: database.getRoles,
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
		choices: database.getDepts,
		name: "roleDept"
	}],
	newDept: [{
		type: "input",
		message: "Name of department:",
		name: "deptName"
	}]
};

module.exports = { KEYWORDS, QUESTIONS };