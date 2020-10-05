$(function(){

    const socket = io()

    //getting dom elements since interface
    const $messageForm = $('#message-form')
    const $messageBox = $('#message')
    const $chat = $('#chat')

    //getting dom elements since interface
    const $contentWrap = $('#contentWrap') 
    const $nickWrap = $('#nickWrap')
    const $nickForm = $('#nickForm')
    const $nickError = $('#nickError')
    const $nickName = $('#nickName')

    const $userNames = $('#userNames')


    //events
    $messageForm.submit((e)=>{        
        e.preventDefault()
        let message = $messageBox.val()
        
        socket.emit('send message',message)
        $messageBox.val('')
    })

    $nickForm.submit((e)=>{
        e.preventDefault()
        let nickName = $nickName.val()

        socket.emit('new user', nickName,(res)=>{
            if(res){
                $nickWrap.hide()
                $contentWrap.show()
            }else{
                $nickError.html(`
                <div class="alert alert-danger">The nick name is allready exists.</div>
                `)
            }
        })
        $nickName.val('')
    })

    socket.on('new message',(data)=>{
        $chat.append(data,'<br/>')
    })

    socket.on('user names',(userslist)=>{
        let list = ''
        for(user of userslist)
        list += `<p><i class="fas fa-user"></i> ${user}</p>`
        $userNames.html(list)
    })

})