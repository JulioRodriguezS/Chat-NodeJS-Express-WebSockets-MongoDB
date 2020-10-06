const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv/config')

const app = express()
const server = http.createServer(app)
const io = socketio.listen(server)

//static files
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json)
app.use(express.urlencoded({extended:false}))
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

//db connection
mongoose.connect(process.env.DB_CONNECTION,{ 
    useCreateIndex:true,
    useNewUrlParser: true,
    useFindAndModify:true,  
    useUnifiedTopology: true  
})
.then(
    db=>{console.log('DB CONNECTED')}
)
.catch(
    err=>{console.log('ERR: ',err)}
)


require('./sockets/sockets')(io)

app.set('port', process.env.PORT || 3000)
const port = app.get('port') 
server.listen(port,()=>{
    console.log('server on port ', port)
})
