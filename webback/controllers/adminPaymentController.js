var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
pay = mongoose.model('Pay')

app.use(body.json());

exports.getAllPayment = async function(req, res) {
    const allData = await pay.find()
    res.send(allData)
}


exports.updateStatus = async function(req, res) {
    const find = {
        BookID: req.body.bookID
    }
    const update = {
        PaymentStatus: req.body.status
    }

    const result = await pay.findOneAndUpdate(find, update)
}