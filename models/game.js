const mongoose = require('mongoose');
const Participant = require('./participant')

const gameSchema = mongoose.Schema(
    {
        winner: {type:mongoose.Schema.Types.ObjectId, ref:"Participant"},
        loser: [{type:mongoose.Schema.Types.ObjectId, ref:"Participant"}],
        type: {type:String, required:[true,"Type of Game Required"]},
    }
)

exports.model = mongoose.model('Game', gameSchema);
exports.Schema = gameSchema;