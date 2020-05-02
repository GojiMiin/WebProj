var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var roomTypeSchema = new Schema({
    TypeName: {
        type: String
    },
    RoomDetail: {
        type: String
    },
    PricePerDay: {
        type: Number
    },
    Properties: {
        type: String
    },
    Size: {
        type: Number
    }
})

module.exports = mongoose.model('roomType', roomTypeSchema, 'RoomType')