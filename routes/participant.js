const express = require ('express'); 
const router = express.Router();
const Participant = require('../models/participant');
const mongoose = require('mongoose');

router.get('/', function(req,res){
    Participant.model.find()
    .populate('deck')
    .populate('player', 'name').exec(function(err,Participant){
        res.json(Participant);
    });
});

router.post('/',function(req,res){
    let postParticipant = new Participant.model(req.body);
    postParticipant.save()
        .then(resParticipant => {
            res.send(resParticipant);
        })
        .catch(function(err){
            res.status(422).send('Participant add failed');
        });
});

module.exports = router;