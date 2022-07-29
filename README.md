# Axmanware Business CMS (Enterprise Ver)

[![badge](https://img.shields.io/github/license/Axeljk/uw_m12_employee)](https://www.github.com/Axeljk/uw_m12_employee/blob/main/license)

## Description
Keep track of your business's departments and workforce with this lightweight and powerful CMS software. Organize your employees, job positions, and departments.

<details>
<summary>Click to view table of contents</summary>

## Table of Contents
* [Installation](#installation)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)
* [Questions](#questions)
</details>

## Installation
Note: you will need Node.js and MySQL installed to run this program.

Clone the repo and unzip it in a secure place. To install with the necessary dependencies, run the following command from the folder:

 ```bash
npm i
```

In your MySQL shell, run the following to establish your database:

```MySQL
SOURCE ./db/schema.sql;
```

Optionally, you may also seed your data for testing:

```MySQL
SOURCE ./db/seeds.sql;
```

## Dependencies
- MySQL
- Node.js
	- inquirer
	- console.table
	- mysql2

## Usage
To use, run the following command:

```bash
node index.js
```

You will be presented with a dozen options to manage your business. View Employees, Roles, and Departments are self-explanatory. Add Employee, Role, and Department will prompt you for details before creating entries in the respective field. Update Employee's Role and Manager will change that person's job position and who they report to. Delete Employee, Role, and Department will remove those entries from the database. Be warned: roles of a deleted department, and employees of a deleted role, will also be deleted.

[You may also view a video demo here](https://watch.screencastify.com/v/4v21pWV5S4tteTATNEAp)

## Contributors
- Axel Kern, main author
- Abbey Free, supporting me in all things

## License
Licensed under the [MIT](https://www.github.com/Axeljk/uw_m12_employee/blob/main/license) license.

## Questions
If you have any questions, open an issue or contact directly at [axeljkern@yahoo.com](mailto:axeljkern@yahoo.com). You can find more of my work on [GitHub](https://www.github.com/Axeljk).