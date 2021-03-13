const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 7000;
const db = require("./Repository/mydb.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost/MyDataBase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Successfully Connected to DB"))
  .catch("connecting to db failed.");

app.post("/addmovie", async (req, res) => {
  const value = await db.creatingMovie(req.body.movie, req.body.genre);
  res.send(value);
});

app.get("/getmovie", async (req, res) => {
  const value = await db.findMovie(req.query.movieName);
  res.send(value);
});

app.delete("/remove", async (req, res) => {
  const value = await db.deleteMovie(req.query.name);
  res.send(value);
});

app.patch("/updatemovie", async (req, res) => {
  console.log(req.query.name, req.body.genre);
  try {
    const value = await db.updateMovie(req.query.name, req.body.genre);
    res.send(value);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
