const Note = require("../models/notes.model");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const note = new Note({
      id: Date.now(),
      title,
      content,
      user: req.user.id,
    });
    await note.save();
    return res.status(201).json({
      success: true,
      message: "Note Created successfully 🔥🔥",
      note,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getNote = async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getOneNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    return res.status(200).json({
      success: true,
      note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const deleteNote = async (req, res) => {
  try {
    await Note.deleteMany();
    return res.status(200).json({
      success: true,
      message: "All notes deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const deleteOneNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ id: id });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    await Note.findOneAndDelete({ id: id });
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateOneNote = async (req, res) => {
  try {
    const NoteId = req.params.id;
    const { title, content } = req.body;

    // Check if the note exists before attempting update
    const note = await Note.findOne({ id: NoteId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await Note.findOneAndUpdate({ id: NoteId }, { title, content });
    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createNote,
  getNote,
  getOneNote,
  deleteNote,
  updateOneNote,
  deleteOneNote,
};
