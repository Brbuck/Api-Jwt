const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const routes = require("./routes/index.routes");
const app = express();

app.use(express.json());
var cors = require("cors");
app.use(cors());

dotenv.config();
database();

app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server started on port 5000 ");
});
