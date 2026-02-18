const Note = () => {
  return (
    <div className="w-95 p-4 bg-blue-200 mb-4 ">
      <h1 className="text-2xl font-medium">Title</h1>
      <p className="text-2xl mb-4">Description</p>
      <div className="flex gap-2">
        <button className="bg-red-500 text-white px-2 py-1 rounded-full">
          Delete Button
        </button>
        <button className="bg-green-500 text-white px-2 py-1 rounded-full">
          Update Button
        </button>
      </div>
    </div>
  );
};

export default Note;
