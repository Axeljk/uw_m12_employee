const tables = require("console.table");
const inquirer = require("inquirer");
const QUESTIONS = require("./util/promptQuestions");
const database = require("./util/queryUtil");

function init() {
	main();
}

function main() {
	inquirer.prompt(QUESTIONS.menu)
	.then(answers => {
		switch (answers.selection) {
			case (QUESTIONS.KEYS.VIEW_EMPL):
				viewEmployees();
				break;
			case (QUESTIONS.KEYS.ADD_EMPL):
				addEmployee();
				break;
			case (QUESTIONS.KEYS.EMPL_ROLE):
				updateEmployee();
				break;
			case (QUESTIONS.KEYS.ADD_ROLE):
				addRole();
				break;
			case (QUESTIONS.KEYS.VIEW_ROLE):
				viewRoles();
				break;
			case (QUESTIONS.KEYS.VIEW_DEPT):
				viewDepartments();
				break;
			case (QUESTIONS.KEYS.ADD_DEPT):
				addDept();
				break;
			case(QUESTIONS.KEYS.DEL_DEPT):
				delEntry("delDept", "departments");
				break;
			case(QUESTIONS.KEYS.DEL_ROLE):
				delEntry("delRole", "roles");
				break;
			case(QUESTIONS.KEYS.DEL_EMPL):
				delEntry("delEmpl", "employees");
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

function delEntry(method, table) {
	inquirer.prompt(QUESTIONS[method])
	.then(results => database.delEntry(table, results))
	.then(main);
}

init();