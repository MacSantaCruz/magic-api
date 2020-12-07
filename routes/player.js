const express = require ('express'); 
const router = express.Router();
const Player = require('../models/player');
const mongoose = require('mongoose');

router.get('/', function(req,res){
 Player.model.find()
 .populate({path:'wins losses',
  populate:{path:'winner loser',
  populate:{path:'deck player', select:["name", "color"]}}}).exec(function(err, Player){
        res.json(Player);
    });
});

router.get('/names', function(req, res){
    Player.model.find({},['name'], 
        (err, Players) => {
            if(err){
                console.log(err);
                return;
            }
            res.json(Players);
        }
    );
});

router.post('/',function(req,res){
    let postPlay = new Player.model(req.body);
    postPlay.save()
        .then(resPlay => {
            res.send(resPlay);
        })
        .catch(function(err){
            res.status(422).send('Player add failed');
        });
});

module.exports = router;