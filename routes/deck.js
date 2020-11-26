const express = require ('express'); 
const router = express.Router();
const Deck = require('../models/deck');
const mongoose = require('mongoose');

router.get('/', function(req,res){
    Deck.model.find(function(err,deck){
        res.json(deck);
    });
});

router.post('/',function(req,res){
    let postDeck = new Deck.model(req.body);
    postDeck.save()
        .then(resDeck => {
            res.send(resDeck);
        })
        .catch(function(err){
            res.status(422).send('Deck add failed');
        });
});

module.exports = router;