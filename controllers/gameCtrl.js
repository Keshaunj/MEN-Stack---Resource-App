const Game = require('../models/game');

const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.render('games/index', { games });
    } catch (error) {
        res.status(500).send('Error fetching games');
    }   
};

const createGame = async (req, res) => {
    try {
        const newGame = new Game({
            title: req.body.title,
            genre: req.body.genre,
            platform: req.body.platform,
        });
        await newGame.save();
        res.redirect('/games');  
    } catch (error) {
        res.status(500).send('Error creating game');
    }
};

module.exports = {
    getAllGames,
    createGame,
};
