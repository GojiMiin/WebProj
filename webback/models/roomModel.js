var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    roomNum: {
        type: Number
    },
    RoomStatus: {
        type: String
    },
    RoomCondition: {
        type: String
    },
    TypeName: {
        type: String
    }
});

module.exports = mongoose.model('Room', roomSchema, 'Room')