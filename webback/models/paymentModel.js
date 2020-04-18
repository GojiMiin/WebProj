var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var paySchema = new Schema({
    PaymentID: String,
    PayDate: Date,
    PayTotal: Number,
    Bank: String,
    BookID: String,
    PaymentImg: Object
});

module.exports = mongoose.model('pay', paySchema, 'Payment')