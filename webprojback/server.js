var express = require('express')
var cors = require('cors')
app = express()
app.use(cors())
port = process.env.PORT || 3000
mongoose = require('mongoose')
User = require('./api/models/userModel')
Member = require('./api/models/memberModel')
bodyParser = require('body-parser')
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://GojiMiin:342510@webproject-dfylq.mongodb.net/Hotel?retryWrites=true&w=majority', function (error) {
    if (error) throw error
    console.log('Successfully connected');
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var userroutes = require('./api/routes/userRoutes')
userroutes(app)

var authroutes = require('./api/routes/authRoutes')
authroutes(app)

app.listen(port)

console.log('Server started on : ' + port)