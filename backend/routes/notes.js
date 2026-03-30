const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//add a new note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "enter a description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
    // res.json(notes)
  },
);

//update a note - login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //newnote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // //find the note to update and update
  let note = await Notes.findById(req.params.id);
  if (!note) {
    res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true },
  );
  res.json({ note });
});

//delete notes
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // //find the note to update and delete
  let note = await Notes.findById(req.params.id);
  if (!note) {
    res.status(404).send("Not Found");
  }
  //allow if user own this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ Success: "Note has been deleted", note: note });
});

module.exports = router;
