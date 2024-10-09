const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const Game = require("./models/game");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("styles"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.redirect("/games/new");
});

app.get("/games/index", async (req, res) => {
  try {
    const games = await Game.find();
    res.render("games/gameIndex", { games });
  } catch (error) {
    res.status(500).send("Error fetching games");
  }
});

app.get("/games/list", async (req, res) => {
  try {
    const games = await Game.find();
    res.render("games/gamesList", { games });
  } catch (error) {
    res.status(500).send("Error fetching games");
  }
});

app.get("/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.render("games/gameIndex", { games });
  } catch (error) {
    res.status(500).send("Error fetching games");
  }
});

app.get("/games/new", (req, res) => {
  res.render("games/new");
});

app.post("/games", async (req, res) => {
  try {
    const newGame = new Game({
      title: req.body.title,
      genre: req.body.genre,
      platform: req.body.platform,
    });
    await newGame.save();
    res.redirect("/games/index");
  } catch (error) {
    res.status(500).send("Error adding game");
  }
});

app.get("/games/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.render("games/show", { game });
  } catch (error) {
    res.status(500).send("Error fetching game details");
  }
});


app.get("/games/edit/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.render("games/edit", { game });
  } catch (error) {
    res.status(500).send("Error fetching game details for edit");
  }
});


app.post("/games/edit/:id", async (req, res) => {
  try {
    await Game.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: req.body.genre,
      platform: req.body.platform,
    });
    res.redirect("/games/index");
  } catch (error) {
    res.status(500).send("Error updating game");
  }
});


app.post("/games/delete/:id", async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.redirect("/games/index");
  } catch (error) {
    res.status(500).send("Error deleting game");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
