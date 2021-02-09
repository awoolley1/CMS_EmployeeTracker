const inquirer = require("inquirer");
const mysql = require("mysql");
require('dotenv').config()

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "employeetracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runPrompt();
});

function runPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update role for an existing employee",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View department":
          viewDepartment();
          break;

        case "View role":
          viewRole();
          break;

        case "View employee":
          viewEmployee();
          break;

        case "Update role for an existing employee":
          updateEmployee();
          break;
      }
    });
}

function addDepartment() {
    inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "What department would you like to add?"
      })
      .then(function(answer) {
        var query = "INSERT INTO department (name) VALUES (?)";


    
        connection.query(query, answer.department, function(err, res) {
            if (err) throw err;

            console.log("Added to database");

            runPrompt();
       
        });
      });
  }

  