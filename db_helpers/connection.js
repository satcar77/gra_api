const mysql = require('mysql');
const dbConfig = require('../db_helpers/cred');

const pool = mysql.createPool(dbConfig);

module.exports = async () => new Promise(
(resolve, reject) => {
	pool.getConnection((err,connection)=>{
    if(err){
      reject(error);
      return;
    }
    resolve(connection)
  });
});