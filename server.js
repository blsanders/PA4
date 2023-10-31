const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
app.use(morgan('combined'));


const connection = mysql.createConnection({
  host: 'ckshdphy86qnz0bj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'qwtc2ygzezjtuk67',
  password: 'yos3wvvp0mt0o6ik',
  database: 'htgsxjqmbxundbnc',
});

connection.connect(() => {

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS myActs (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      Type VARCHAR(255),
      Distance FLOAT,
      Date DATE,
      Pinned BOOLEAN
    )`;

  connection.query(createTableQuery, () => {});
});

app.use(bodyParser.json());

app.use(express.static(__dirname));

app.post('/addActivity', (req, res) => {
  const newActivity = req.body;
  const insertQuery = 'INSERT INTO myActs (Type, Distance, Date, Pinned) VALUES (?, ?, ?, ?)';
  const values = [newActivity.Type, newActivity.Distance, newActivity.Date, newActivity.Pinned];

  connection.query(insertQuery, values);
});