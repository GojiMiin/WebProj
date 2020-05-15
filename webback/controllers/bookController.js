var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
book = mongoose.model('Book')
User = mongoose.model('Users')

app.use(body.json());

//Prepare data for send to database
exports.sendBooking = async function(req, res) {
    let bookDetail = new book(req.body);
    console.log(bookDetail)
    let BookID = ""
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const count = await book.countDocuments()
        if (count == 0) {
            BookID = 'B0001'
        } else {
            const condition = /\w+[0]+0/
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
        }
    bookDetail.BookID = BookID
    bookDetail.BookDate = date
    await book.create(bookDetail)
    //get bookId from user detail
    const Userdata = await User.findOne({ username: req.user.username })
    let allBook = ""
    if( Userdata.BookID == ""){
        allBook = bookDetail.BookID
    } else {
        allBook = Userdata.BookID + "," + bookDetail.BookID 
    }
    //update bookID in user detail
    User.findOneAndUpdate({username: req.user.username}, {BookID : allBook},{ new: true }, (err, user) => {
        if (err) throw err
        console.log(user)
    })

    console.log(allBook)
    res.send(bookDetail)
}

//send data to start booking
exports.initPage = async function(req, res) {
    let matchBook = []
    //get all book detail from database
    let allItems = await book.find()
    for(i in req.body){
        //filter to get only that room in type
        let matchData = allItems.filter((room)=>{
            return room.roomNum === req.body[i]
        })
        for(j in matchData)
        {
            matchBook.push(matchData[j])
        }
    }
    console.log(matchBook)
    res.send(matchBook)
}