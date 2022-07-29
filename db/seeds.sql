INSERT INTO departments (name)
VALUES	("Marketing"),
		("Finance"),
		("Operations"),
		("H. Resources"),
		("Info. Tech.");

INSERT INTO roles (title, salary, department_id)
VALUES	("Salesperson", 65000, 1),
		("Sales Lead", 80000, 1),
		("Auditor", 59000, 2),
		("Accountant", 61000, 2),
		("Cost Analysist", 68000, 2),
		("OP Coordinator", 48000, 3),
		("Project Manager", 77000, 3),
		("HR Coordinator", 40000, 4),
		("Recruiter", 52000, 4),
		("Network Admin", 62000, 5),
		("Software Engineer", 89000, 5),
		("Information Security", 103000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES	("Axel", "Kern", 11, null),
		("Frank", "Michael", 7, null),
		("Abbey", "Free", 6, 2),
		("Joey", "Joseph", 6, 2),
		("Samantha", "Hepler", 9, null),
		("William", "Yost", 2, null),
		("Jamie", "Fergenson", 1, 6);