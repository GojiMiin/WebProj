var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
roomType = mongoose.model('roomType')

exports.getPrice = async function(req, res) {
    let type = {
        TypeName: req.params.type
    }
    const allDetail = await roomType.findOne(type)
    res.send(allDetail)
}

