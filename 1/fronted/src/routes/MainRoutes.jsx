import { Route, Routes } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import Home from "../components/Home";
import ProtectedRoute from "../components/ProtectedRoute";

const MainRoutes = ({
  notes,
  setNotes,
  updateNote,
  setUpdateNote,
  createNote,
  setCreateNote,
  handleCreateNote,
}) => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                notes={notes}
                setNotes={setNotes}
                updateNote={updateNote}
                setUpdateNote={setUpdateNote}
                createNote={createNote}
                setCreateNote={setCreateNote}
                handleCreateNote={handleCreateNote}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
