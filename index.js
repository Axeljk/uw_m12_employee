const inquirer = require("inquirer");
const QUESTIONS = require("./util/promptQuestions");
const database = require("./util/queryUtil");

// Init function wraps first call to main selection.
// "Just in case" any code needs to be added to before starting the program.
function init() {
	main();
}

// This is the main selection menu. A switch statement handles directing the
// client to the proper functionality.
function main() {
	inquirer.prompt(QUESTIONS.menu)
	.then(answers => {
		switch (answers.selection) {
			case (QUESTIONS.KEYS.VIEW_EMPL):
				viewTable("Empls");
				break;
			case (QUESTIONS.KEYS.ADD_EMPL):
				addEntry("Empl");
				break;
			case (QUESTIONS.KEYS.EMPL_ROLE):
				updateEmployee();
				break;
			case (QUESTIONS.KEYS.EMPL_MAN):
				updateManager();
				break;
			case (QUESTIONS.KEYS.ADD_ROLE):
				addEntry("Role");
				break;
			case (QUESTIONS.KEYS.VIEW_ROLE):
				viewTable("Roles");
				break;
			case (QUESTIONS.KEYS.VIEW_DEPT):
				viewTable("Depts");
				break;
			case (QUESTIONS.KEYS.ADD_DEPT):
				addEntry("Dept");
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
			case(QUESTIONS.KEYS.DEPT_BUDG):
				viewTable("Budg");
				break;
			default:  // Quit
				console.log("Exiting...");
				process.exit(0);
		}
	});
}

/*
	View department, role, or employee (or bonus: budget):
		Database (from queryUtil) grabs data from the database,
			and formats it with console.table.
		Then it is returned here and displayed to the client with console.log.
		Finally, the main selection menu is called again for further action.
*/
function viewTable(table) {
	database["display" + table]()
	.then(console.log)
	.then(main);
}

/*
	Add department, role, or employee:
		Question user for details with promptQuestions.js.
		Send the data to the database to enter the entry.
		Finally, the main selection menu is called again for further action.
*/
function addEntry(table) {
	inquirer.prompt(QUESTIONS["new" + table])
	.then(answers => database["add" + table](answers))
	.then(main);
}

/*
	Employee role change:
		Question user for details with promptQuestions.js.
		Send the data to the database to UPDATE the entry.
		Finally, the main selection menu is called again for further action.
*/
function updateEmployee() {
	inquirer.prompt(QUESTIONS.updateEmpl)
	.then(answers => database.setRole(answers))
	.then(main);
}

/*
	Employee's manager change:
		Question user for details with promptQuestions.js.
		Send the data to the database to UPDATE the entry.
		Finally, the main selection menu is called again for further action.
*/
function updateManager() {
	inquirer.prompt(QUESTIONS.updateMan)
	.then(answers => database.setMan(answers))
	.then(main);
}

/*
	Delete department, role, or employee:
		Take name of QUESTIONS method to determine which list to display.
		Send the results and name of proper table to the database to delete.
		Finally, the main selection menu is called again for further action.
*/
function delEntry(method, table) {
	inquirer.prompt(QUESTIONS[method])
	.then(results => database.delEntry(table, results))
	.then(main);
}

init();