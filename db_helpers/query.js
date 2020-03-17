module.exports = async (conn, q) => new Promise(
(resolve, reject) => {
  const handler = (error, result,fields) => {
    conn.release();
	  if (error) {
      reject(error);
      return;
    }
    resolve(result);
  }
  conn.query(q, handler);
});