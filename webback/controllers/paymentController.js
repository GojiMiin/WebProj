var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var body = require('body-parser')
var users = require('../models/UserModel');
var pay = require('../models/paymentModel');
app.use(body())

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

exports.getInformation = function (req, res) {
    var payID = ''
    pay.countDocuments(function (err, count) {
        /* upload.single('picture') */
        /* var img = fs.readFileSync( req.file.path )
        var encode_image = img.toString('base64')
        var img = new Buffer(encode_image, 'base64') */

        //generate PaymentID
        if (err) throw err
        if (count == 0) {
            payID = 'P0001'
            console.log(payID)
        } else {
            count += 1
            myID = '' + count
            while (myID.length < 4) {
                myID = '0' + myID
            }
            payID = 'P' + myID
        }
        console.log(req.body)
        var data = {
            PaymentID: payID,
            PayDate: req.body.PayDate,
            PayTotal: req.body.PayTotal,
            Bank: req.body.Bank
            /* PaymentImg: img  */
        };
        res.json(data)
        pay.create(data, function (err, res) {
            if (err) throw err
            console.log('success')
        }) 
    })

}

exports.hi = function (req, res) {
    res.end("Hiii")
}
