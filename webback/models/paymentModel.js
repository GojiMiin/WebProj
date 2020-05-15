var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var paySchema = new Schema({
    PaymentID: {
        type: String
    },
    PayDate: {
        type: Date
    },
    PayTotal: {
        type: Number
    },
    Bank: {
        type: String
    },
    PaymentImg: {
        type: String
    },
    BookID: {
        type: String
    },
    username: {
        type: String
    }
});

module.exports = mongoose.model('Pay', paySchema, 'Payment')