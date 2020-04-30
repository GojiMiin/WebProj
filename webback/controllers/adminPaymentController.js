var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
var pay = require('../models/paymentModel');

app.use(body.json());

exports.getAllPayment = async function(req, res) {
    let allData = await pay.find()
    res.send(allData)
}


exports.updateStatus = async function(req, res) {
    let find = {
        BookID: req.body.bookID
    }
    let update = {
        PaymentStatus: req.body.status
    }

    let result = await pay.findOneAndUpdate(find, update)
}