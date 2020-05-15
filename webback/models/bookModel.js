var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    BookID: {
        type: String
    },
    BookDate: {
        type: Date
    },
    Checkin: {
        type: Date
    },
    Checkout: {
        type: Date
    },
    Price: {
        type: Number
    },
    roomNum: {
        type: Number
    },
    roomType: {
        type: String
    }
})

module.exports = mongoose.model('Book', bookSchema, 'Book')