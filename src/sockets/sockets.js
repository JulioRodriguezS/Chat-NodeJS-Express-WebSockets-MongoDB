module.exports = function(io){
    let nickNames=[]

    io.on('connection', newsocket=>{
        console.log('new user connected')

        newsocket.on('send message',(data)=>{
            io.sockets.emit('new message',data)
        })

        newsocket.on('new user', (nickname, callback)=>{
            if(nickNames.indexOf(nickname)!=-1){
                callback(false)
            }else{
                callback(true)
                newsocket.nickname = nickname
                nickNames.push(newsocket.nickname)
                updateNickNames()
            }
        })
        
        newsocket.on('disconnect',(data)=>{
            if(!newsocket.nickname)return
            nickNames.splice(nickNames.indexOf(newsocket.nickname),1)
            updateNickNames()
        })

        function updateNickNames(){
            io.sockets.emit('user names',nickNames)
        }
    })
}
