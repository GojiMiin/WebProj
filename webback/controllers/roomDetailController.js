var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
var users = require('../models/UserModel');
var room = require('../models/roomModel');
var roomType = require('../models/roomTypeModel');

exports.getPrice = async function(req, res) {
    let type = {
        TypeName: req.params.type
    }
    let allDetail = await roomType.findOne(type)
    res.send(allDetail)
}

