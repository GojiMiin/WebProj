var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./routes/hotelRoutes');

var mongo_uri = "mongodb+srv://GojiMiin:342510@webproject-dfylq.mongodb.net/Hotel?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] : connected to the database ");
  },
  error => {
    console.log("[failed] " + error);
    process.exit();
  }
);

app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
port = process.env.PORT || 3000

routes(app)
app.listen(port)

console.log('Payment started on : ' + port)