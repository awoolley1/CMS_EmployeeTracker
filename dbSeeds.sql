DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;\

USE employeetracker_db;

CREATE TABLE employee(
id INTEGER(1) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER 
  manager_id INTEGER
  PRIMARY KEY (id)
  FOREIGN KEY (role_id) REFERENCES roles(id)
  FOREIGN KEY (manager_id) REFERENCES department(id)
);

CREATE TABLE department(


);

CREATE TABLE roles(


);