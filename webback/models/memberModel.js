
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MemberSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    DoB: {
        type: Date
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    tel: {
        type: String
    },
    ProfilePic: {
        type: String
    }
})

module.exports = mongoose.model('Member', MemberSchema, "Member")