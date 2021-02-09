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


  const addRoleQuestions = [
    {
      name: "role",
      type: "input",
      message: "What is the title of the role you would like to add?"
    },
    
    {
      name: "rolesal",
      type: "number",
      message: "What is the salary of the role you would like to add?"
    },
    
    {
      name: "roledep",
      type: "number",
      message: "What is the department ID of the role you would like to add?"
    }
  ];
  
  function addRole() {
    inquirer
      .prompt(addRoleQuestions)
      .then(function(answer1) {
        var query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";


    
        connection.query(query, [answer1.role, answer1.rolesal, answer1.roledep], function(err, res) {
            if (err) throw err;

            console.log("Added to database");

            runPrompt();
       
        });
      });
  }
  

  const addEmployeeQuestions = [
    {
      name: "employeefn",
      type: "input",
      message: "What is the first name of the employee you would like to add?"
    },
    
    {
      name: "employeeln",
      type: "input",
      message: "What is the last name of the employee you would like to add?"
    },
    
    {
      name: "employeerid",
      type: "number",
      message: "What is the role ID of the employee you would like to add?"
    },

    {
      name: "employeemid",
      type: "number",
      message: "What is the manager/department ID of the employee you would like to add?"
    }
  ];
  
  function addEmployee() {
    inquirer
      .prompt(addEmployeeQuestions)
      .then(function(answer2) {
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";


    
        connection.query(query, [answer2.employeefn, answer2.employeeln, answer2.employeerid, answer2.employeemid], function(err, res) {
            if (err) throw err;

            console.log("Added to database");

            runPrompt();
       
        });
      });
  }