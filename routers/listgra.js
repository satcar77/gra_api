const express = require('express');
const router = express.Router();
const connection = require('../db_helpers/connection');
const query = require('../db_helpers/query');
router.post('/list', async (req, res) => {
    const {profid} = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM ra WHERE created_by=${profid}`).catch(console.log);
    res.json({ results });
})
router.post('/add', async (req, res) => {
    const {name,degree,major,skills,profid} = req.body; 
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `INSERT INTO ra(name,degree,major,skills,created_by) VALUES('${name}','${degree}','${major}','${skills}',${profid})`).catch(e=>res.send(e));
    res.end()
})
router.post('/delete', async(req,res)=>{
    const { id } = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `DELETE FROM ra WHERE id =${id}`).catch(e => console.log(e));
    res.end()
    console.log(`Deleted ${id}`);
   
})

router.post('/edit', async(req,res)=>{
    const { id,name,degree,major,skills } = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `UPDATE ra SET name = '${name}', degree = '${degree}', major = '${major}', skills = '${skills}' WHERE id =${id}`).catch(e => console.log(e));
    res.end()
    console.log(`Edited ${id}`);
   
})
router.post('/updateStatus', async(req,res)=>{
    const { id,status } = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `UPDATE ra SET status = '${status}' WHERE id =${id}`).catch(e => console.log(e));
    res.end()
})



module.exports = router;