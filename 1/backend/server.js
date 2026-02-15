const app = require("./src/app");
const dotenv = require("dotenv");
const connectDB = require("./src/db/db");

dotenv.config();

// Connect to MongoDB
connectDB();

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
