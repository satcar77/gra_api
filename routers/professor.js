const express = require('express');
const router = express.Router();
const connection = require('../db_helpers/connection');
const query = require('../db_helpers/query');

router.post('/', async (req, res) => {
    const {name} = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const insertion = await query(conn, `INSERT INTO Professors(name) VALUES('${name}');`).catch(console.log);
    res.json({id: insertion.insertId});
})

router.put('/info/:id', async(req,res)=>{
    const id = req.params.id;
    const {name} = req.body; 
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `UPDATE Professors SET name = '${name}' WHERE id =${id}`).catch(e => console.log(e));
    res.end()
    console.log(`Edited ${id}`);
   
})

router.get('/info/:id', async (req, res) => {
    const id = req.params.id;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM Professors WHERE id=${id}`).catch(console.log);
    res.json(results);
})

router.get('/gra/:id', async (req, res) => {
    const profid = req.params.id;
    const conn = await connection().catch(e => {console.log(e)}) 
    const results = await query(conn, `SELECT * FROM ra WHERE created_by=${profid}`).catch(console.log);
    res.json({ results });
})
router.post('/gra/:id', async (req, res) => {
    const profid = parseInt(req.params.id);
    const {name,degree,major,skills} = req.body; 
    console.log(`ADDING GRA. PROF ID = ${profid}`)
    console.log(req.body);
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `INSERT INTO ra(name,degree,major,skills,created_by) VALUES('${name}','${degree}','${major}','${skills}',${profid})`).catch(e=>console.log(e));
    res.end()
})
router.delete('/gra/:profid/:id', async(req,res)=>{
    const profid = req.params.profid;
    const id = req.params.id;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `DELETE FROM ra WHERE id =${id} AND created_by=${profid}`).catch(e => console.log(e));
    res.end()
    console.log(`Deleted ${id}`);
   
})

router.put('/gra/:id', async(req,res)=>{
    const profid  = req.params.id;
    const { id,name,degree,major,skills } = req.body;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `UPDATE ra SET name = '${name}', degree = '${degree}', major = '${major}', skills = '${skills}' WHERE id =${id} AND created_by=${profid}`).catch(e => console.log(e));
    res.end()
    console.log(`Edited ${id}`);
   
})

router.get('/task/:id', async (req, res) => {
    const profid = req.params.id;
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    const results = await query(conn, `SELECT * FROM task WHERE created_by=${profid}`).catch(console.log);
    res.json({results});    
})
router.post('/task/:id', async (req, res) => {
    const profid  = req.params.id;
    const {name,deadline,assigned_to,details} = req.body; 
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    if(assigned_to === undefined) 
    await query(conn, `INSERT INTO task(name,deadline,details,created_by) VALUES('${name}','${deadline}','${details}','${profid}')`).catch(e=>res.send(e));
    else
    await query(conn, `INSERT INTO task(name,deadline,assigned_to,details,created_by) VALUES('${name}','${deadline}','${assigned_to}','${details}','${profid}')`).catch(e=>res.send(e));
    res.end()
})
router.delete('/task/:id/:taskid', async(req,res)=>{
    const id = req.params.taskid;
    const profid = req.params.id;
    console.log(`DELETE id=${id} by profid=${profid}`)
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    await query(conn, `DELETE FROM task WHERE id =${id} AND created_by=${profid}`).catch(e => console.log(e));
    res.end()
   
})

router.put('/task/:id', async(req,res)=>{
    const profid = req.params.id;
    const {id,name,deadline,assigned_to,details} = req.body; 
    const conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
    if(assigned_to === undefined)
    await query(conn, `UPDATE task SET name = '${name}', deadline = '${deadline}', details = '${details}' WHERE id =${id} AND created_by=${profid}`).catch(e => console.log(e));
    else
    await query(conn, `UPDATE task SET name = '${name}', deadline = '${deadline}', assigned_to = '${assigned_to}', details = '${details}' WHERE id =${id} AND created_by=${profid}`).catch(e => console.log(e)); 
    res.end()
    console.log(`Edited ${id}`);
   
})



module.exports = router;

// router.post('/studentList', async (req, res) => {
//     const {id} = req.body;
//     let conn = await connection().catch(e => {console.log("Error establishing connection to DB!")}) 
//     const profid = await query(conn, `SELECT Professors.id FROM Professors INNER JOIN ra ON Professors.id = ra.created_by WHERE ra.id = ${id}`).catch(console.log);
//     conn = await connection().catch(e => {console.log("Error establishing connection to DB!")});
//     const results = await query(conn, `SELECT task.id,task.name,task.deadline,task.details,ra.name as assigned_to,task.completion FROM task LEFT JOIN ra ON task.assigned_to=ra.id WHERE task.created_by =${profid[0].id}`).catch(console.log);
//     res.json({ results });
// })
