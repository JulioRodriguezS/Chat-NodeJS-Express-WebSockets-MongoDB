const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    message:{
        type:String,
        require: true
    },
    dateSend:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('chat', chatSchema)