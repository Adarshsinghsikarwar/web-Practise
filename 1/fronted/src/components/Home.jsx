import Note from "./Note";
const Home = () => {
  return (
    <div className="bg-red-300 h-[90vh] w-[90vw] px-3 py-2">
      <h1 className="text-2xl font-bold ">Notes App</h1>
      <div className="flex flex-wrap gap-2">
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </div>
    </div>
  );
};

export default Home;
