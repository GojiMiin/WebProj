var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
book = mongoose.model('Book')

app.use(body.json());

exports.sendBooking = async function(req, res) {
    let bookDetail = new book(req.body);
    let BookID = ""
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const count = await book.countDocuments()
        if (count == 0) {
            BookID = 'B0001'
        } else {
            const condition = /\w+[0]/
            const last = await book.find({}).sort({ _id: -1 }).limit(1);
            let idWant = last[0].BookID
            //gen BookID continue from last bookID
            let OnlyNum = idWant.replace(condition, " ")
            OnlyNum = parseInt(OnlyNum)
            OnlyNum += 1
            //Put into id form
            myID = '' + OnlyNum
            while (myID.length < 4) {
                myID = '0' + myID
            }
            BookID = 'B' + myID 
            console.log(BookID)
        }
    bookDetail.BookID = BookID
    bookDetail.BookDate = date
    await book.create(bookDetail)
}

exports.initPage = async function(req, res) {
    let matchBook = []

    let allItems = await book.find({})
    for(i in req.body){
        let matchData = allItems.filter((room)=>{
            return room.roomNum == req.body[i].roomNum
        })
        matchBook[i] = matchData[0]
    }
    res.send(matchBook)

}