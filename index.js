const tables = require("console.table");
const inquirer = require("inquirer");
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
			case (KEY_ADD_DEPT):
				addDept();
				break;
			default:  // Quit
				console.log("Exiting...");
				process.exit(0);
		}
	});
}

function viewEmployees() {
	database.displayEmpls()
	.then(table => "\n\t" + tables.getTable(table).slice(0, -1).replaceAll("\n", "\n\t"))
	.then(console.log)
	.then(main);
}

function addEmployee() {
	inquirer.prompt(QUESTIONS.newEmpl)
	.then(answers => database.addEmpl(answers))
	.then(main);
}

function updateEmployee() {
	inquirer.prompt(QUESTIONS.updateEmpl)
	.then(answers => database.setRole(answers))
	.then(main);
}

function addRole() {
	inquirer.prompt(QUESTIONS.newRole)
	.then(results => database.addRole(results))
	.then(main);
}

function viewRoles() {
	database.displayRoles()
	.then(table => "\n\t" + tables.getTable(table).slice(0, -1).replaceAll("\n", "\n\t"))
	.then(console.log)
	.then(main);
}

function viewDepartments() {
	database.displayDepts()
	.then(table => "\n\t" + tables.getTable(table).slice(0, -1).replaceAll("\n", "\n\t"))
	.then(console.log)
	.then(main);
}

function addDept() {
	inquirer.prompt(QUESTIONS.newDept)
	.then(results => database.addDept(results))
	.then(main);
}

init();