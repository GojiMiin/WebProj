var express = require('express')
var mongoose = require('mongoose');
var body = require('body-parser')
var app = express();
book = mongoose.model('Book')
User = mongoose.model('Users')

app.use(body.json());

exports.getAll = async function(req, res) {
    //receive user data by username
    const Userdata = await User.findOne({username : req.user.username})
    console.log(Userdata)
    let allBook = []
    //get specific bookID in user
    let userBooked = Userdata.BookID.split(',')
    for (i in userBooked) {
        BookID= {
            BookID: userBooked[i]
        }
        let List = await book.find(BookID)
        allBook.push(List[0])
    }
    console.log(allBook) 
    res.send(allBook)
}