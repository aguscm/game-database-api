import express from "express";
import type { IGame } from "../../interfaces";
import { getGames, getGameById, addGame, editGame, deleteGame, validateGameFields } from "../../data/data";

const router = express.Router();

// GET - Get all games
router.route("/").get(function (req, res) {
  const games: IGame[] = getGames();
  res.status(200).json(games);
});

// GET - Get a game by ID
router.route("/:id").get(function (req, res) {
  const { id } = req.params;
  const gameId = Number(id);

  const game: IGame = getGameById(gameId);

  if (!game) {
    res.status(404).json({ message: "Game not found" });
    return;
  }

  res.status(200).json(game);
});

// POST - Add a new game
router.route("/").post(function (req, res) {
  const gameData: Omit<IGame, 'id'> = {
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    short_description: req.body.short_description,
    genre: req.body.genre,
    release_date: req.body.release_date,
    popularity: req.body.popularity,
    platform: req.body.platform,
    developer: req.body.developer
  };

  const validation = validateGameFields(gameData);

  if (!validation.valid) {
    res.status(400).json({ message: validation.message });
    return;
  }

  const newGame = addGame(gameData);

  if (!newGame) {
    res.status(400).json({ message: "Failed to add game" });
    return;
  }

  res.status(201).json(newGame);
});

// PUT - Edit a game
router.route("/:id").put(function (req, res) {
  const { id } = req.params;
  const gameId = Number(id);
  const updates = req.body;

  if (!id) {
    res.status(400).json({ message: "Game ID is required" });
    return;
  }

  const game = getGameById(gameId);

  if (!game) {
    res.status(404).json({ message: "Game not found" });
    return;
  }

  const updatedGame = editGame(gameId, updates);

  if (!updatedGame) {
    res.status(400).json({ message: "Failed to update game" });
    return;
  }

  res.status(200).json(updatedGame);
});

// DELETE - Delete a game
router.route("/:id").delete(function (req, res) {
  const { id } = req.params;
  const gameId = Number(id);

  if (!id) {
    res.status(400).json({ message: "Game ID is required" });
    return;
  }

  const game = getGameById(gameId);

  if (!game) {
    res.status(404).json({ message: "Game not found" });
    return;
  }

  const deleted = deleteGame(gameId);

  if (!deleted) {
    res.status(400).json({ message: "Failed to delete game" });
    return;
  }

  res.status(200).json({ message: "Game deleted successfully" });
});

module.exports = router;