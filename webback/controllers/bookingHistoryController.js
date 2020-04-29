var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
var book = require('../models/bookModel');

app.use(body.json());

exports.getAll = async function(req, res) {
    let allList = await book.find({})
    res.send(allList)
    console.log(allList)
}

exports.cancel = async function(req, res) {
    let forDel = {
        BookID: req.body.BookID
    }
    let result = await book.findOneAndDelete(forDel)
    console.log(result)
    res.send(result)
}