const tables = require("console.table");
const inquirer = require("inquirer");
const mySql = require("mysql2");
const { KEYWORDS, QUESTIONS } = require("./util/promptQuestions");
const [KEY_VIEW_EMPL, KEY_ADD_EMPL, KEY_EMPL_ROLE, KEY_VIEW_ROLE, KEY_ADD_ROLE, KEY_VIEW_DEPT, KEY_ADD_DEPT, QUIT] = KEYWORDS;
const db = require("./util/queryUtil");

const employees = [];
const roles = [];
const departments = [];


function init() {
	QUESTIONS.setVars(employees, roles, departments);
	selection();
}

function selection() {
	inquirer
	.prompt(QUESTIONS.menu)
	.then(answers => {
		switch (answers.selection) {
			case (KEY_VIEW_EMPL):
				console.log(KEY_VIEW_EMPL);
				break;
			case (KEY_ADD_EMPL):
				addEmployee();
				break;
			case (KEY_EMPL_ROLE):
				updateEmployee();
				break;
			default:  // Quit
		}
	});
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
	})
}

init();