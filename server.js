var express = require("express");
var mysql = require("mysql");
var app = express();

/*
 * Database connection
 */
const conn = mysql.createConnection({
  host: "mysql-dev",
  user: "root",
  password: "root",
  database: "node_crud",
});

conn.connect(function (err) {
  if (err) {
    // Server will restart until database connection succeds
    console.log("Cannot connect with database");
  } else {
    // Docker container will restart if database is not yet ready for connectivity
    conn.query(
      "CREATE TABLE IF NOT EXISTS events( e_id INT NOT NULL AUTO_INCREMENT, e_name VARCHAR(100) NOT NULL, e_start_date DATE NOT NULL, e_end_date DATE NOT NULL, e_added_date DATE, e_desc TEXT, e_location VARCHAR(200), PRIMARY KEY(e_id))"
    );

    app.get("/docker-workshop", function (req, res) {
      return res.json({
        message: "Welcome to the docker workshop!!!",
      });
    });

    app.listen(3000, function () {
      console.log("Server started on port 3000 | 8080 if running on docker...");
    });
  }
});
