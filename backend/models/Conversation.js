const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    messages:[
        {
            from:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
            body: {
                type: String,
                required: true,
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports = mongoose.model('conversations',conversationSchema)