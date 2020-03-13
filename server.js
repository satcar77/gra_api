const express = require('express')
const app = express()
const port = 4000

const bodyParser = require('body-parser');
const listgraRouter = require('./routers/listgra')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
  
app.use('/gra',listgraRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))