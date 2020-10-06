module.exports = function(io){
    let users = {}

    io.on('connection', newsocket=>{
        console.log('new user connected')

        newsocket.on('send message', (message, callback)=>{

            message=message.trim()

            let splitMsg = message.split(' ')

            if(splitMsg[0] == '/w'){
                
                if(splitMsg[1] in users){
                    
                    users[splitMsg[1]].emit('whisper',{
                        message: splitMsg[2],
                        nickname: newsocket.nickname
                    })
                }else{  
                    callback({
                        message: "Error! the user is now not valid.",
                        nickname: newsocket.nickname
                    })
                }
                if(!splitMsg[2]){
                    callback({
                        message: "Error! please enter a message.",
                        nickname: newsocket.nickname
                    })
                }
            }else{                
                io.sockets.emit('new message',{
                    message: message,
                    nickname: newsocket.nickname
                })
            }
        })

        newsocket.on('new user', (nickname, callback)=>{
            if(nickname in users){
                callback(false)
            }else{
                callback(true)
                newsocket.nickname = nickname
                users[newsocket.nickname] = newsocket
                updateNickNames()
            }
        })
        
        newsocket.on('disconnect',(data)=>{
            if(!newsocket.nickname)return
            delete users[newsocket.nickname]
            updateNickNames()
        })

        function updateNickNames(){
            io.sockets.emit('user names',Object.keys(users))
        }   
    })
}
