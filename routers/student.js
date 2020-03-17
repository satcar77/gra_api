const express = require('express');
const router = express.Router();
const query = require('../db_helpers/query');
const connection = require('../db_helpers/connection');

router.post('/list', async (req, res) => {
    const {id} = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM task WHERE assigned_to=${id}`).catch(console.log);
    res.json({ results });
})
router.post('/updateCompletion', async (req, res) => {
    for (x in req.body){
        let conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
        let qstring=`UPDATE task SET completion=${req.body[x]} WHERE id=${x};`
        await query(conn,qstring).catch(e => console.log(e));
    }
    res.end();
})

module.exports = router;