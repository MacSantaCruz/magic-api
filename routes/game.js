const express = require ('express'); 
const router = express.Router();
const Deck = require("../models/deck");
const Player = require("../models/player");
const Game = require('../models/game');
const Participant = require('../models/participant');
const mongoose = require('mongoose');

router.get('/', function(req,res){
 Game.model.find()
 .populate({path: 'winner',
  populate:{path:'deck'}})
  .populate({path:'loser', populate:{path:'deck'}}).exec(function(err, Game){
        res.json(Game);
    });
});

router.post('/',function(req,res){
    let winnerDeck = req.body.winner.deck;
    let winnerId = req.body.winner.player._id;
    let losers = req.body.loser;
    let winnerParticpant = new Participant.model(req.body["winner"]);
    winnerParticpant.save()
    .then(resWinner => {
            req.body.winner = resWinner._id;
            let loserModels = [];
        for(let participant of req.body.loser){
                let loserParticipant = new Participant.model(participant);
                loserModels.push(loserParticipant);
            }
            req.body.loser = [];
            return Participant.model.insertMany(loserModels);
    })
    .then(resLoser => {
        for(let loser of resLoser){
            req.body.loser.push(loser._id);
        }
        let postGame = new Game.model(req.body);
        return postGame.save();
    })
    .then(game => {
        Player.model.findOneAndUpdate({_id:winnerId}, {$push:{wins:game}}, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }

        });
        Deck.model.findOneAndUpdate({_id:winnerDeck._id},{$inc:{'win_count':1}}, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
        for(let loser of losers){
            let loserId = loser.player._id;
            Player.model.findOneAndUpdate({_id:loserId}, {$push:{losses:game}}, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
            Deck.model.findOneAndUpdate({_id:loser.deck._id},{$inc:{'loss_count':1}}, function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
        }
        return game;
    })
    .then(game => {
        res.send(game);
    })
    .catch(function(err){
        console.log(err);
        res.status(422).send('Game add failed');
    });
});

module.exports = router;