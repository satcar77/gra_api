const mysql = require('mysql');
const dbConfig = require('../db_helpers/cred');

const connection = mysql.createConnection(dbConfig);
module.exports = async () => new Promise(
(resolve, reject) => {
      connection.connect((err)=>{
        if(err){
          reject(err);
          return;
        }
        resolve(connection);
      })
});