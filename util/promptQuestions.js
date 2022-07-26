const KEYWORDS = ["View Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"];
const [KEY_VIEW_EMPL, KEY_ADD_EMPL, KEY_EMPL_ROLE, KEY_VIEW_ROLE, KEY_ADD_ROLE, KEY_VIEW_DEPT, KEY_ADD_DEPT, QUIT] = KEYWORDS;

let EMPL = [];
let ROLE = [];
let DEPT = [];

const listEmpl = () => EMPL.map(e => e.first + e.last);
const listRole = () => ROLE.map(e => e.name);
const listDept = () => DEPT.map(e => e.name);

const QUESTIONS = {
	menu: [{
		type: "list",
		choices: () => {
			let options = [KEY_ADD_DEPT, QUIT];

			if (DEPT.length > 0) {
				options.unshift(KEY_VIEW_DEPT);
				options.unshift(KEY_ADD_ROLE);
			}
			if (ROLE.length > 0)
				options.unshift(KEY_VIEW_ROLE);
			if (ROLE.length > 0 && EMPL.length > 0)
				options.unshift(KEY_EMPL_ROLE);
			if (DEPT.length > 0 && ROLE.length > 0 && EMPL.length > 0)
				options.unshift(KEY_ADD_EMPL);
			if (EMPL.length > 0)
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
		choices: listRole(),
		name: "emplRole"
	},
	{
		type: "list",
		message: "Employee's manager:",
		choices: listEmpl(),
		name: "emplMan"
	}],
	updateEmpl: [{
		type: "list",
		message: "Update which employee:",
		choices: listEmpl(),
		name: "updateName"
	},
	{
		type: "list",
		message: "Employee's new role:",
		choices: listRole(),
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
		choices: listDept(),
		name: "roleDept"
	}],
	newDept: [{
		type: "input",
		message: "Name of department:",
		name: "deptName"
	}],
	setVars: function(employees, roles, departments) {
		EMPL = employees;
		ROLE = roles;
		DEPT = departments;
	}
};

module.exports = { KEYWORDS, QUESTIONS };