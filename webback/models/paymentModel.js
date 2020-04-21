var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var paySchema = new Schema({
    PaymentID: String,
    PayDate: Date,
    PayTotal: Number,
    Bank: String,
    PaymentStatus: "",
    PaymentImg: String,
    BookID: String,
    username: String
});

module.exports = mongoose.model('pay', paySchema, 'Payment')