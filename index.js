const express = require("express");
const commandRoute = require("./routes/commandRoute");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//Cross-Origin Resource Sharing (CORS) handler
app.use(cors());

//dotenv configuration method.
dotenv.config();

//mongoose connection process
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); //middleware for parsing postbody format to object format
app.use("/api/command", commandRoute);
// app.use("/api/posts", postRoute);
app.listen(4000);
