const express = require('express')
const app = express()
const port = 4000
const listgraRouter = require('./routers/listgra')
const listtaskRouter = require('./routers/listtask')
const settingsRouter = require('./routers/settings')
const studentRouter = require('./routers/student')

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
  
app.use('/gra',listgraRouter)
app.use('/task',listtaskRouter)
app.use('/settings',settingsRouter)
app.use('/student',studentRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))