var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./routes/paymentRoutes');

app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
port = process.env.PORT || 3000

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/webProj', function(error){
    if(error) throw error
    console.log("Successfully connected");
})

routes(app)
app.listen(port)

console.log('Payment started on : ' + port)