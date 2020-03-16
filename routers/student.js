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
router.post('/updateCompletion', async (req, res) => {
    let qstring = ``;
    for (x in req.body){
        qstring+=`UPDATE task SET completion=${req.body[x]} WHERE id=${x};`
    }
    newConfig = {...dbConfig};
    newConfig.multipleStatements = true;
    const conn = await connection(newConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn,qstring).catch(e => console.log(e));
    res.end();
})

module.exports = router;