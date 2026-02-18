const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const NoteController = require("../controllers/note.controller");
const Note = require("../models/notes.model");

const router = express.Router();

router.post("/createNote", authMiddleware, NoteController.createNote);
router.get("/getNote", authMiddleware, NoteController.getNote);
router.get("/getOneNote/:id", authMiddleware, NoteController.getOneNote);
router.delete(
  "/deleteOneNote/:id",
  authMiddleware,
  NoteController.deleteOneNote,
);
router.put("/updateOneNote/:id", authMiddleware, NoteController.updateOneNote);
router.delete("/deleteNote", authMiddleware, NoteController.deleteNote);

module.exports = router;
