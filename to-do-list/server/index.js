const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path:'./config.env'})
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(require('./routes/record.js'));

const dbo = require('./db/conn.js');
app.listen(port,()=>{
    dbo.connectToServer(function(err){
        if(err) console.log(err)
    })
    console.log(`Server running at ${port}`)
})