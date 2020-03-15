const express = require('express');
const router = express.Router();
const dbConfig = require('../db_helpers/cred');
const connection = require('../db_helpers/connection');
const query = require('../db_helpers/query');

router.post('/list', async (req, res) => {
    const {profid} = req.body;
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM task WHERE created_by=${profid}`).catch(console.log);
    res.json({ results });
})
router.post('/add', async (req, res) => {
    const {name,deadline,assigned_to,details,profid} = req.body; 
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    if(assigned_to === undefined) 
    await query(conn, `INSERT INTO task(name,deadline,details,created_by) VALUES('${name}','${deadline}','${details}','${profid}')`).catch(e=>res.send(e));
    else
    await query(conn, `INSERT INTO task(name,deadline,assigned_to,details,created_by) VALUES('${name}','${deadline}','${assigned_to}','${details}','${profid}')`).catch(e=>res.send(e));
    res.end()
})
router.post('/delete', async(req,res)=>{
    const { id } = req.body;
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `DELETE FROM task WHERE id =${id}`).catch(e => console.log(e));
    res.end()
    console.log(`Deleted ${id}`);
   
})

router.post('/edit', async(req,res)=>{
    const {id,name,deadline,assigned_to,details} = req.body; 
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    if(assigned_to === undefined)
    await query(conn, `UPDATE task SET name = '${name}', deadline = '${deadline}', details = '${details}' WHERE id =${id}`).catch(e => console.log(e));
    else
    await query(conn, `UPDATE task SET name = '${name}', deadline = '${deadline}', assigned_to = '${assigned_to}', details = '${details}' WHERE id =${id}`).catch(e => console.log(e));
    res.end()
    console.log(`Edited ${id}`);
   
})
module.exports = router;