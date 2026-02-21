import { useForm } from "react-hook-form";
import Note from "./Note";
import axios from "../api/config";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Home = ({
  notes,
  setNotes,
  updateNote,
  setUpdateNote,
  createNote,
  setCreateNote,
  handleCreateNote,
}) => {
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

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const res = await axios.get("/note/getNote");
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
    getAllNotes();
  }, [createNote]);

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

  const updateNoteHandler = async (data) => {
    try {
      const res = await axios.put(`note//updateOneNote/${id}`, data);
      if (res.data.success) {
        toast.success(res.data.message);
        setUpdateNote(false);
        setNotes(
          notes.map((note) => (note.id === id ? { ...note, ...data } : note)),
        );
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Notes App</h1>

        <div className="flex gap-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-sm">
            Delete All Notes
          </button>
          <button
            onClick={() => handleCreateNote()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium shadow-sm"
          >
            Create New Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            note={note}
            updateNoteHandler={updateNoteHandler}
            deleteNoteHandler={deleteNoteHandler}
          />
        ))}
      </div>

      {createNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">
                Create New Note
              </h2>
              <button
                onClick={() => setCreateNote(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit(createNoteHandler)}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  type="text"
                  placeholder="Enter note title..."
                  className={`w-full px-4 py-2 rounded-lg border ${errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} focus:border-transparent focus:ring-2 outline-none transition-all`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  {...register("content", { required: "Content is required" })}
                  rows="4"
                  placeholder="Enter note details..."
                  className={`w-full px-4 py-2 rounded-lg border ${errors.content ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} focus:border-transparent focus:ring-2 outline-none transition-all resize-none`}
                />
                {errors.content && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCreateNote(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm"
                >
                  Create Note
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
