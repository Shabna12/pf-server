// loads .env file contents into process.env by default, moreover in dis pro sensitive items r not der so !
require('dotenv').config()

//dis v need so assigned in variable
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')

//connection.js file importing to run
require('./db/connection')


//server creating - req resolve cheyyan patum, route um set aakanum
const pfServer = express()



pfServer.use(cors())
pfServer.use(express.json())  //dis is middleware --- dis for json
pfServer.use(router)   //only after writing dat, this use router here write cheyyan paadullu
pfServer.use('/uploads',express.static('./Uploads')) // to get access of b-e file from f-e

const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project FAir Server started at PORT : ${PORT}`);
})

pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style='color:red;'>Project Fair Server started, and waiting for client request !!</h1>`)
})

pfServer.post('/',(req,res)=>{
    res.status(200).send(`POST REQUEST`)
})
