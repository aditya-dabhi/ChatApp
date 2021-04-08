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
            type:mongoose.Schema.Types.ObjectId,
            ref:'conversations'
        }
    ],
    request_notification: [
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
        }
    ]
})

module.exports = mongoose.model('users',userSchema)