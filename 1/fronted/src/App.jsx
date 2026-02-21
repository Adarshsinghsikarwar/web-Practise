import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";
import { useState } from "react";

const App = () => {
  const [createNote, setCreateNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [updateNote, setUpdateNote] = useState(false);
  const handleCreateNote = () => {
    setCreateNote(true);
  };
  
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
      <Navbar />
      <MainRoutes
        notes={notes}
        setNotes={setNotes}
        createNote={createNote}
        setCreateNote={setCreateNote}
        handleCreateNote={handleCreateNote}
        updateNote={updateNote}
        setUpdateNote={setUpdateNote}
      />
    </div>
  );
};

export default App;
