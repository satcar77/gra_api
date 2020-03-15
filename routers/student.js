const express = require('express');
const router = express.Router();
const dbConfig = require('../db_helpers/cred');
const connection = require('../db_helpers/connection');
const query = require('../db_helpers/query');

router.post('/list', async (req, res) => {
    const {id} = req.body;
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM task WHERE assigned_to=${id}`).catch(console.log);
    res.json({ results });
})

module.exports = router;