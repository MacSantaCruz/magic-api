require('dotenv').config();
const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');


const app = express();
//const PORT = 3001;
//const MONGODB_URI = "mongodb://localhost:27017/my_local_db";
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/',require('./routes/index'));
app.use('/api/pythonScript',require('./routes/pythonScript'));
app.use('/api/deck', require('./routes/deck'));
app.use('/api/participant', require('./routes/participant'));
app.use('/api/game', require('./routes/game'));
app.use('/api/player', require('./routes/player'));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });

mongoose.connection.once('open', function() {
    console.log('Connected to the Database');
});
mongoose.connection.on('error', function(error){
    console.log('Mongoose Connection Error : ' + error);
});


app.listen(process.env.PORT, function() {
     console.log(`Server listening on port ${process.env.PORT}`)
});

