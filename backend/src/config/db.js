// const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: "localhost",
//     // host: "127.0.0.1",
//   user: "root",
//   password: "",       
//   database: "city_care"
// });

// module.exports = db;


const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",   // use ipv4
  user: "root",
  password: "",       
  database: "city_care",
  port: 3307           // 🔥 IMPORTANT
});

module.exports = db;
