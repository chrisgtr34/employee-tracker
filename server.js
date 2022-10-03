const inquirer = require('inquirer')
const mysql = require('mysql2')
const consoleTable = require('console.table')

// Connect to Database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: 'root',
      // MySQL password
      password: process.env.DB_PW,
      database: 'employees'
    },
    console.log(`Accessing employees database.`)
);
  
// Starts prompt
const startPrompt = () => {
    inquirer.prompt ([
        {
        type: "list",
        message: "Please select from the following",
        name: "startPrompt",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Exit"]
        }
    ]).then(function(answer) {
        switch (answer.startPrompt) {
            case "View Employees":
                showEmployees();
                break;
            case "Add Employee":
                addEmployees();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Role":
                newRole();
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Exit":
                exit();
                break;
            }
        })
    };
    

function showEmployees () {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

function addEmployees () {
    inquirer.prompt ([
        {
            type: "input",
            name: "firstName",
            message: "Please enter employee's first name"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter employee's last name"
        },
        {
            type: "input",
            name: "roleId",
            message: "Please enter employee's role ID"
        },
        {
            type: "input",
            name: "managerId",
            message: "Please enter employee's manager ID"
        },
    ]).then(function (answer) {
        const firstName = answer.firstName;
        const lastName = answer.lastName;
        const roleId = answer.roleId;
        const managerId = answer.managerId;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}","${lastName}",${roleId},${managerId})`;
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log("Employee data has been succesffuly added");
            console.table(res);
            startPrompt();
        });
    });
};

function updateEmployee() {
    inquirer.prompt ([
        {
            type: "input",
            name:"updateRole",
            message: "Select an Employee you wish to update"
        },
        {
            type: "input",
            name: "newRole",
            message: "Select a new role for Employee"
        }
    ]).then(function (answer) {
        const updateRole = answer.updateRole;
        const newRole = answer.newRole;
        const updateQuery = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateRole}"`;
        db.query(updateQuery, function (err,res) {
            if (err) throw err;
            console.log("Employee data has been updated");
            console.table(res);
            startPrompt();
        });
    });
}

function viewRoles () {
    var query = `SELECT FROM role`;
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
};

function newRole () {
    inquirer.prompt ([
        {
            type: "input",
            name: "roleName",
            message: "Enter the employee's new role title"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Enter the employee's salary"
        },
        {
            type: "input",
            name: "deptId",
            message: "Enter the employee's department ID"
        },
    ]).then(function (answer) {
        const empTitle = answer.roleName;
        const empSalary = answer.roleSalary;
        const deptId = answer.deptId;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${empTitle}","${empSalary}","${deptId}")`;
        db.query(query, function (err, res) {
            if (err) throw err;
            console.log("Employee Role has been added successfully");
            console.table(res);
            startPrompt();
        });
    });
};

