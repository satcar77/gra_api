const express = require('express')
const app = express()
const port = 4000
const professorRouter = require('./routers/professor')
const studentRouter = require('./routers/student')
const cors = require('cors')

app.use(express.json());
app.use(cors());
  
app.use('/professor',professorRouter)
app.use('/student',studentRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))