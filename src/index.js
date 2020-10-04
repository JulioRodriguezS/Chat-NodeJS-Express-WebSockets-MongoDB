const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio.listen(server)

require('./sockets/sockets')(io)

//static files
app.use(express.static(path.join(__dirname,'public')))


app.set('port', process.env.PORT || 3000)
const port = app.get('port') 
server.listen(port,()=>{
    console.log('server on port ', port)
})
