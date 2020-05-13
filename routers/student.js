const express = require('express');
const router = express.Router();
const query = require('../db_helpers/query');
const connection = require('../db_helpers/connection');

router.get('/task/:id', async (req, res) => {
    const id = req.params.id;
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
router.get('/alltask/:id', async (req, res) => {
    const id = req.params.id;
    let conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const profid = await query(conn, `SELECT Professors.id FROM Professors INNER JOIN ra ON Professors.id = ra.created_by WHERE ra.id = ${id}`).catch(console.log);
    conn = await connection().catch(e => {console.log("Error establishing connection to DB!")});
    const results = await query(conn, `SELECT task.id,task.name,task.deadline,task.details,ra.name as assigned_to,task.completion FROM task LEFT JOIN ra ON task.assigned_to=ra.id WHERE task.created_by =${profid[0].id}`).catch(console.log);
    res.json({ results });
})
router.get('/info/:id', async (req, res) => {
    const id = req.params.id;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM ra WHERE id=${id}`).catch(console.log);
    res.json(results);
})
router.post('/updateStatus/:id', async(req,res)=>{
    const id = req.params.id;
    const { status } = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `UPDATE ra SET status = '${status}' WHERE id =${id}`).catch(e => console.log(e));
    res.end()
})

module.exports = router;