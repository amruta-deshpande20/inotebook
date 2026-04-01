const connectToMongo = require("./db");
const express = require("express");
require("dotenv").config();
const cors = require("cors");

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`app is listening to port http://localhost:${port}`);
});
