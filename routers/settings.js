const express = require('express');
const router = express.Router();
const dbConfig = require('../db_helpers/cred');
const connection = require('../db_helpers/connection');
const query = require('../db_helpers/query');

// router.post('/add', async (req, res) => {
//     const {name,deadline,assigned_to,details} = req.body; 
//     const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
//     if(assigned_to === undefined) 
//     await query(conn, `INSERT INTO task(name,deadline,details) VALUES('${name}','${deadline}','${details}')`).catch(e=>res.send(e));
//     else
//     await query(conn, `INSERT INTO task(name,deadline,assigned_to,details) VALUES('${name}','${deadline}','${assigned_to}','${details}')`).catch(e=>res.send(e));
    
//     res.end()
// })

router.post('/editProfInfo', async(req,res)=>{
    const {id,name,deadline,assigned_to,details} = req.body; 
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `UPDATE Professors SET name = '${name}' WHERE id =${id}`).catch(e => console.log(e));
    res.end()
    console.log(`Edited ${id}`);
   
})

router.post('/getProfInfo', async (req, res) => {
    const {id} = req.body;
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM Professors WHERE id=${id}`).catch(console.log);
    res.json(results);
})
router.post('/getStudentInfo', async (req, res) => {
    const {id} = req.body;
    const conn = await connection(dbConfig).catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM ra WHERE id=${id}`).catch(console.log);
    res.json(results);
})
module.exports = router;