var express = require("express");
var router = express.Router();
var db = require("../Repository/mydb.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/addmovie", async (req, res) => {
  const value = await db.creatingMovie(req.body.movie, req.body.genre);
  res.send(value);
});

router.get("/getmovie", async (req, res) => {
  const value = await db.findMovie(req.query.movieName);
  res.send(value);
});

router.delete("/remove", async (req, res) => {
  const value = await db.deleteMovie(req.query.name);
  res.send(value);
});

router.patch("/updatemovie", async (req, res) => {
  console.log(req.query.name, req.body.genre);
  try {
    const value = await db.updateMovie(req.query.name, req.body.genre);
    res.send(value);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
