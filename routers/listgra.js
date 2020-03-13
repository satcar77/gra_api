const express = require('express');
const router = express.Router();
const dbConfig = require('../db_helpers/cred');
const connection = require('../db_helpers/connection');
const query = require('../db_helpers/query');
router.get('/list', async (req, res) => {
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, 'SELECT * FROM ra').catch(console.log);
    res.json({ results });
})
router.post('/add', async (req, res) => {
    console.log(req)
    const {name,degree,major,skills} =req.body; 
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `INSERT INTO ra(name,degree,major,skills) VALUES('${name}','${degree}','${major}','${skills}')`).catch(e=>res.send(e));
    res.end()
})

module.exports = router;