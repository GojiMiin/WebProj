
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    admin: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    memberID: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    BookID: {
        type: String
    }
})

module.exports = mongoose.model('Users', UserSchema, "Users")