const express = require('express');
const router = express.Router();
const connection = require('../db_helpers/connection');
const query = require('../db_helpers/query');

router.post('/editProfInfo', async(req,res)=>{
    const {id,name,deadline,assigned_to,details} = req.body; 
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `UPDATE Professors SET name = '${name}' WHERE id =${id}`).catch(e => console.log(e));
    res.end()
    console.log(`Edited ${id}`);
   
})

router.post('/getProfInfo', async (req, res) => {
    const {id} = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM Professors WHERE id=${id}`).catch(console.log);
    res.json(results);
})
router.post('/getStudentInfo', async (req, res) => {
    const {id} = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM ra WHERE id=${id}`).catch(console.log);
    res.json(results);
})
router.post('/addNewProfessor', async (req, res) => {
    const {name} = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const insertion = await query(conn, `INSERT INTO Professors(name) VALUES('${name}');`).catch(console.log);
    res.json({id: insertion.insertId});
})
module.exports = router;