module.exports = function(io){
    io.on('connection', newsocket=>{
        console.log('new user connected')
    })
}
