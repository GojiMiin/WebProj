var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    BookID: String,
    BookDate: Date,
    Checkin: Date,
    Checkout: Date,
    Price: Number,
    roomNum: Number
})

module.exports = mongoose.model('Book', bookSchema, 'Book')