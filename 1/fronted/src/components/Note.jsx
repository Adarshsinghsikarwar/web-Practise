const Note = ({ id, note, deleteNoteHandler, updateNoteHandler }) => {
  return (
    <div className="w-full p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">{note.content}</p>
      </div>
      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => deleteNoteHandler(id)}
          className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Delete
        </button>
        <button
          onClick={() => updateNoteHandler(id)}
          className="bg-green-100 hover:bg-green-200 text-green-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Note;
