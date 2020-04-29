var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    roomNum: Number,
    RoomStatus: String,
    RoomCondition: String,
    TypeName: String
});

module.exports = mongoose.model('book', roomSchema, 'Room')