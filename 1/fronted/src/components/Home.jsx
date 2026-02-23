import { useForm } from "react-hook-form";
import Note from "./Note";
import axios from "../api/config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({
  notes,
  setNotes,
  updateNote,
  setUpdateNote,
  createNote,
  setCreateNote,
  handleCreateNote,
}) => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createNoteHandler = async (data) => {
    try {
      const res = await axios.post("/note/createNote", data);
      if (res.data.success) {
        toast.success(res.data.message);
        setNotes((prev) => [...prev, res.data.note]); // ✅ append new note to state directly
        setCreateNote(false);
        reset();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const getAllNotes = async () => {
    try {
      const res = await axios.get("/note/getNote");
      console.log(res);
      if (res.data.success) {
        setNotes(res.data.notes);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    getAllNotes(); // ✅ runs only once when the page first loads
  }, []);

  const deleteNoteHandler = async (id) => {
    try {
      const res = await axios.delete(`/note/deleteOneNote/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        setNotes(notes.filter((note) => note.id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  // Pre-fill the update form with the current note's values when the modal opens
  useEffect(() => {
    if (update) {
      reset({
        title: update.title,
        content: update.content,
      });
    }
  }, [update, reset]);

  // formData comes from react-hook-form's handleSubmit — it contains the EDITED values
  const updateNoteHandler = async (formData) => {
    try {
      const res = await axios.put(`note/updateOneNote/${update?.id}`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setUpdateNote(false);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === update?.id ? { ...note, ...formData } : note,
          ),
        );
        setUpdate(null);
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const deleteAllNote = async () => {
    try {
      const res = await axios.delete("/note/deleteNote");
      if (res.data.success) {
        toast.success("All notes deleted");
        setNotes([]);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };
  const handleLogout = async () => {
    try {
      const res = await axios.post("/auth/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/sign-in");
        }, 500);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-header-left">
          <div className="home-icon">📝</div>
          <div>
            <h1 className="home-title">My Notes</h1>
            <p className="home-subtitle">
              {notes.length} note{notes.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>
        <div className="home-header-actions">
          {notes.length > 0 && (
            <button onClick={deleteAllNote} className="btn-danger">
              🗑️ Clear All
            </button>
          )}
          <button onClick={handleCreateNote} className="btn-primary">
            ＋ New Note
          </button>
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🗒️</div>
          <h2 className="empty-title">No notes yet</h2>
          <p className="empty-desc">
            Click "New Note" to create your first note
          </p>
          <button onClick={handleCreateNote} className="btn-primary">
            ＋ Create Note
          </button>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              note={note}
              updateNoteHandler={updateNoteHandler}
              setUpdate={setUpdate}
              setUpdateNote={setUpdateNote}
              deleteNoteHandler={deleteNoteHandler}
            />
          ))}
        </div>
      )}

      {createNote && (
        <div className="modal-overlay" onClick={() => setCreateNote(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header modal-header-create">
              <div className="modal-header-text">
                <span className="modal-header-icon">✨</span>
                <h2 className="modal-title">Create New Note</h2>
              </div>
              <button
                onClick={() => {
                  setCreateNote(false);
                  reset();
                }}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit(createNoteHandler)}
              className="modal-form"
            >
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  placeholder="Enter a title..."
                  className={`form-input ${errors.title ? "input-error" : ""}`}
                />
                {errors.title && (
                  <p className="form-error">⚠ {errors.title.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea
                  {...register("content", { required: "Content is required" })}
                  rows="5"
                  placeholder="Write something..."
                  className={`form-input form-textarea ${errors.content ? "input-error" : ""}`}
                />
                {errors.content && (
                  <p className="form-error">⚠ {errors.content.message}</p>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setCreateNote(false);
                    reset();
                  }}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  ✓ Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {updateNote && (
        <div className="modal-overlay" onClick={() => setUpdateNote(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header modal-header-update">
              <div className="modal-header-text">
                <span className="modal-header-icon">✏️</span>
                <h2 className="modal-title">Update Note</h2>
              </div>
              <button
                onClick={() => {
                  setUpdateNote(false);
                  reset();
                }}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit(updateNoteHandler)}
              className="modal-form"
            >
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  placeholder="Enter a title..."
                  className={`form-input ${errors.title ? "input-error" : ""}`}
                />
                {errors.title && (
                  <p className="form-error">⚠ {errors.title.message}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea
                  {...register("content", { required: "Content is required" })}
                  rows="5"
                  placeholder="Write something..."
                  className={`form-input form-textarea ${errors.content ? "input-error" : ""}`}
                />
                {errors.content && (
                  <p className="form-error">⚠ {errors.content.message}</p>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setUpdateNote(false);
                    reset();
                  }}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-update">
                  ✓ Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
