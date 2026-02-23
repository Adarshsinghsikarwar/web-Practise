const Note = ({ id, note, deleteNoteHandler, setUpdateNote, setUpdate }) => {
  return (
    <div className="note-card">
      <div className="note-body">
        <h2 className="note-title">{note.title}</h2>
        <p className="note-content">{note.content}</p>
      </div>

      <div className="note-footer">
        <div className="note-actions">
          <button
            onClick={() => deleteNoteHandler(id)}
            className="note-btn note-btn-delete"
            title="Delete note"
          >
            🗑️ Delete
          </button>
          <button
            onClick={() => {
              setUpdateNote(true);
              setUpdate(note);
            }}
            className="note-btn note-btn-edit"
            title="Edit note"
          >
            ✏️ Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
