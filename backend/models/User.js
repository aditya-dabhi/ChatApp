const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    conversations: [
        { 
            conversation_id: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'conversations'
            }
        }
    ],
})

module.exports = mongoose.model('users',userSchema)