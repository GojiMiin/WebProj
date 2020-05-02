var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
book = mongoose.model('Book')

app.use(body.json());

exports.getAll = async function(req, res) {
    const allList = await book.find({})
    res.send(allList)
    console.log(allList)
}

exports.cancel = async function(req, res) {
    const forDel = {
        BookID: req.body.BookID
    }
    const result = await book.findOneAndDelete(forDel)
    console.log(result)
    res.send(result)
}