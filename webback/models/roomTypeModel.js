var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var roomTypeSchema = new Schema({
    TypeName: String,
    RoomDetail: String,
    PricePerDay: Number,
    Properties: String,
    Size: Number
})

module.exports = mongoose.model('roomType', roomTypeSchema, 'RoomType')