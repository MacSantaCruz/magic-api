const mongoose = require('mongoose');

const deckSchema = mongoose.Schema(
    {
        name: {type:String, required:[true,"Deck Name Required"]},
        color: {type: [String], required:[true,"Color Of Deck Required"]},
        archtype: {type:String, required:[true,"Deck Type Required"]},
        format:{type:String,required:true,enum:['Standard','Modern','Commander','Other']},
        win_count:{type:Number, default:0},
        loss_count:{type:Number, default:0}
    }
)

exports.schema = deckSchema;
exports.model = mongoose.model('Deck', deckSchema);

