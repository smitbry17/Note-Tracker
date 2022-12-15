const route = require("express").Router();
const store = require("../db/store");

route.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = route;
