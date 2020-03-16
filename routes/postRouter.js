const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
  db.insert(req.body)
  .then(post => res.status(201).json(req.body))
  .catch(err => res.status(500).json({ errorMessage: "There was an error while saving the post to the database", success: false, err }))
});