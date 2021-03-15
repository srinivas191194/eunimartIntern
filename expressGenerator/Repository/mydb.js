const { movieModel } = require("../schema/schema1");

async function creatingMovie(movie, genre) {
  let newMovie = new movieModel({
    name: movie,
    genre: genre,
  });
  const val = await movieModel.findOne({ name: movie });
  if (!val) {
    try {
      const obj = await newMovie.save();
      console.log(obj);
      if (obj) {
        return "Movie added to database.";
      }
    } catch (error) {
      return "something went wrong";
    }
  } else {
    return "Movie present in database";
  }
}

async function findMovie(movie) {
  try {
    const val = await movieModel.findOne({ name: movie });
    console.log(val);
    if (val) {
      return val;
    } else {
      return "Movie Not Found";
    }
  } catch (error) {
    console.log(error);
    return "Something went wrong";
  }
}
async function deleteMovie(movie) {
  try {
    const val = await movieModel.deleteOne({ name: movie });
    if (val.deletedCount) {
      return "sucessfully deleted";
    } else {
      return "sorry movie not found";
    }
  } catch (error) {
    return "something went wrong";
  }
}
async function updateMovie(movie, genre) {
  try {
    const movieObject = await movieModel.findOneAndUpdate(
      { name: movie },
      { $set: { genre: genre } }
    );
    if (movieObject) {
      return "sucessfully Updated";
    } else {
      return "no records found.";
    }
  } catch (err) {
    return "something went wrong.";
  }
}
module.exports = { creatingMovie, findMovie, deleteMovie, updateMovie };
