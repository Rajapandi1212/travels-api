const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//Allowing cors
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
//Body parser
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 500000,
  })
);

mongoose.connect("mongodb://localhost:27017/Travels", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error :"));

db.once("open", () => console.log("MongoDB Connected"));

app.get("/", (req, res) => res.send("Welcome to backend!"));

app.use((req, res, next) => {
  res.status(404).send("The requested page does not exist");
});

app.listen(8000, () => console.log("Server listening on 8000"));

process.on("SIGINT", () => {
  db.close(() => {
    console.log("Mongoose Connection disconnected through app termination");
    process.exit(0);
  });
});
