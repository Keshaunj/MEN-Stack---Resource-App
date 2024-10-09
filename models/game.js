const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    genre: { type: String, required: true },   
    platform: { type: String, required: true }, 
});


module.exports = mongoose.model('Game', gameSchema);
