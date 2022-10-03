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
                addRole();
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
    

