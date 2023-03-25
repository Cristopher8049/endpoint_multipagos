var mysql = require("mysql");

const executeQuery = (query, callback, con) => con.query(query, callback);

const pushUsers = (callback1) => {
  var conn = mysql.createConnection({
    host: "database-celina.cmnj5abhtq1b.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "rpU4rtEnZ0ZkiUmUVdOs",
    database: "sys",
  });
  conn.connect(function (err) {
    if (err) throw err;
  });
  callback1(conn);
};
module.exports = {
  executeQuery,
  pushUsers,
};
