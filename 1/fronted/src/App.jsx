import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
      <Navbar />
      <MainRoutes />
    </div>
  );
};

export default App;
