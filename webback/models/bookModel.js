var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    BookID: {
        type: String,
        ref: "Users"
    },
    BookDate: Date,
    Checkin: Date,
    Checkout: Date,
    Price: Number,
    roomNum: Number
})

module.exports = mongoose.model('Book', bookSchema, 'Book')