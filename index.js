const tables = require("console.table");
const inquirer = require("inquirer");
const mySql = require("mysql2");
const { KEYWORDS, QUESTIONS } = require("./util/promptQuestions");
const [KEY_VIEW_EMPL, KEY_ADD_EMPL, KEY_EMPL_ROLE, KEY_VIEW_ROLE, KEY_ADD_ROLE, KEY_VIEW_DEPT, KEY_ADD_DEPT, QUIT] = KEYWORDS;
const database = require("./util/queryUtil");

function init() {
	main();
}

function main() {
	inquirer.prompt(QUESTIONS.menu)
	.then(answers => {
		switch (answers.selection) {
			case (KEY_VIEW_EMPL):
				viewEmployees();
				break;
			case (KEY_ADD_EMPL):
				addEmployee();
				break;
			case (KEY_EMPL_ROLE):
				updateEmployee();
				break;
			case (KEY_ADD_ROLE):
				addRole();
				break;
			case (KEY_VIEW_ROLE):
				viewRoles();
				break;
			case (KEY_VIEW_DEPT):
				viewDepartments();
				break;
			default:  // Quit
				console.log("Exiting...");
				process.exit(0);
				break;
		}
	});
}

function viewEmployees() {
	database.getEmpls()
	.then(table => "\n" + tables.getTable(table).slice(0, -1))
	.then(console.log)
	.then(main);
}

function addEmployee() {
	inquirer
	.prompt(QUESTIONS.newEmpl)
	.then(answers => {
		console.log("DOING THE ADD EMPLOYEE THING");
		main();
	});
}

function updateEmployee() {
	inquirer
	.prompt(QUESTIONS.updateEmpl)
	.then(answers => {
		console.log("DOING THE UPDATE EMPLOYEE THING");
		main();
	});
}

function addRole() {
	inquirer.prompt(QUESTIONS.newRole)
	.then(answers => {
		console.log("DOING THE ADD ROLE THING");
		main();
	});
}

/*function viewTable(t) {
	database.getTable(t)
	.then(table => "\n" + tables.getTable(table).slice(0, -1))
	.then(console.log)
	.then(main);
}*/

async function viewRoles() {
	database.getRoles()
	.then(table => "\n" + tables.getTable(table).slice(0, -1))
	.then(console.log)
	.then(main);
}

async function viewDepartments() {
	database.getDepts()
	.then(table => "\n" + tables.getTable(table).slice(0, -1))
	.then(console.log)
	.then(main);
}

init();