const mongoose = require('mongoose');

const participantSchema = mongoose.Schema(
    {
        player: {type:mongoose.Schema.Types.ObjectId, ref:'Player', required:[true,"Player Name Required"]},
        deck: {type: mongoose.Schema.Types.ObjectId, ref: 'Deck', required:[true,"Player Deck Required"]},
        place: {type:Number, required:[true,"Placing Required"]}
    }
)
mongoose.model('Participant',participantSchema);

exports.model = mongoose.model('Participant',participantSchema);
exports.schema = participantSchema;