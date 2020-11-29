const mongoose = require('mongoose');
const Game = require('./game')

const playerSchema = mongoose.Schema(
    {
        name: {type:String, required:[true,'Player Name Required']},
        wins:[{type: mongoose.Schema.Types.ObjectId, ref: 'Game',default:[]}],
        losses:[{type: mongoose.Schema.Types.ObjectId, ref: 'Game',default:[]}]
    }
)

exports.model = mongoose.model('Player', playerSchema);
exports.schema = playerSchema;