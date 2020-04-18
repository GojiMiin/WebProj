var express = require('express')
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var body = require('body-parser')
var app = express();
var users = require('../models/UserModel');
var pay = require('../models/paymentModel');
var book = require('../models/bookModel');

app.use(body.json());


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({
    storage: storage
})


exports.sendList = function (req, res) {
    var items = ''
    users.findOne(req.body.usename, function (err, res) {
        if (err) throw err
        items = res.BookID.split(',')
        console.log(items)
    })
}

exports.getInformation = upload.single("Receipt"), async function (req, res, next) {

    let payID = ''
    let count = await pay.countDocuments()
    if (count == 0) {
        payID = 'P0001'
    } else {
        count += 1
        myID = '' + count
        while (myID.length < 4) {
            myID = '0' + myID
        }
        payID = 'P' + myID
    }

    let detail = multer.any()
    console.log(detail)
    let data = {
        PaymentID: payID,
        PayDate: req.body.PayDate,
        PayTotal: req.body.PayTotal,
        Bank: req.body.Bank,
        BookID: req.body.BookID
    };

    console.log(req.body)
    //await pay.create(data)
    
}

exports.frontInformation = async function (req, res) {
    let allPrice = []
    let want= {
        username : req.params.username
    }
    let send = {
        thisBookID : Object,
        thisPrice : Object
    }

    let userRaw = await users.findOne(want)
    let allBookID = userRaw.BookID.split(",")
    //console.log(allBookID.split(","))
    
    for(let i in allBookID){
        let eachID = {
            BookID : allBookID[i]
        }
        let IDPrice = await book.findOne(eachID)
        allPrice.push(IDPrice.Price) 
    }

    send.thisBookID = allBookID
    send.thisPrice = allPrice
    res.send(send)
    

}
