const express = require('express');
const router = express.Router();
const connection = require('../db_helpers/connection');
const query = require('../db_helpers/query');

router.post('/list', async (req, res) => {
    const {profid} = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM task WHERE created_by=${profid}`).catch(console.log);
    res.json({results});    
})
router.post('/add', async (req, res) => {
    const {name,deadline,assigned_to,details,profid} = req.body; 
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    if(assigned_to === undefined) 
    await query(conn, `INSERT INTO task(name,deadline,details,created_by) VALUES('${name}','${deadline}','${details}','${profid}')`).catch(e=>res.send(e));
    else
    await query(conn, `INSERT INTO task(name,deadline,assigned_to,details,created_by) VALUES('${name}','${deadline}','${assigned_to}','${details}','${profid}')`).catch(e=>res.send(e));
    res.end()
})
router.post('/delete', async(req,res)=>{
    const { id } = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `DELETE FROM task WHERE id =${id}`).catch(e => console.log(e));
    res.end()
    console.log(`Deleted ${id}`);
   
})

router.post('/edit', async(req,res)=>{
    const {id,name,deadline,assigned_to,details} = req.body; 
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    if(assigned_to === undefined)
    await query(conn, `UPDATE task SET name = '${name}', deadline = '${deadline}', details = '${details}' WHERE id =${id}`).catch(e => console.log(e));
    else
    await query(conn, `UPDATE task SET name = '${name}', deadline = '${deadline}', assigned_to = '${assigned_to}', details = '${details}' WHERE id =${id}`).catch(e => console.log(e)); 
    res.end()
    console.log(`Edited ${id}`);
   
})
router.post('/studentList', async (req, res) => {
    const {id} = req.body;
    let conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const profid = await query(conn, `SELECT Professors.id FROM Professors INNER JOIN ra ON Professors.id = ra.created_by WHERE ra.id = ${id}`).catch(console.log);
    conn = await connection().catch(e => {console.log("Error establishing connection to DB!")});
    const results = await query(conn, `SELECT task.id,task.name,task.deadline,task.details,ra.name as assigned_to,task.completion FROM task LEFT JOIN ra ON task.assigned_to=ra.id WHERE task.created_by =${profid[0].id}`).catch(console.log);
    res.json({ results });
})
module.exports = router;