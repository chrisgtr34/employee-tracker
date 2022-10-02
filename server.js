const inquirer = require('inquirer')
const mysql = require('mysql2')
const consoleTable = require('console.table')

// Connect to Database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: 'root',
      // MySQL password
      password: '@Rotaryguy34',
      database: 'employees'
    },
    console.log(`Accessing employees database.`)
  );
  


