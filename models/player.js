const mongoose = require('mongoose');
const Game = require('./game')

const playerSchema = mongoose.Schema(
    {
        name: {type:String, required:[true,'Player Name Required']},
        wins:[{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
        losses:[{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]
    }
)

exports.model = mongoose.model('Player', playerSchema);
exports.schema = playerSchema;