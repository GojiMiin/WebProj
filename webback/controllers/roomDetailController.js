var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
roomType = mongoose.model('roomType')
room = mongoose.model('Room')

//send price for setup room detail page
exports.getPrice = async function(req, res) {
    let type = {
        TypeName: req.params.type
    }
    const allDetail = await roomType.findOne(type)
    res.send(allDetail)
}

//get all room number in type
exports.getRoom = async function(req, res) {
    let type = {
        TypeName: req.params.type
    }
    const typeRoomNum = await room.find(type)
    res.json(typeRoomNum)
}

