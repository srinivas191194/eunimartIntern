from movies import *


@app.route("/")
def hello():
    return "helloworld"


@app.route("/movies", methods=["GET"])
def get_movies():
    return jsonify({"Movies": Movie.get_all_movies()})


@app.router("/movies/<int:id>", methods=["GET"])
def get_movie_by_id(id):
    return_value = Movie.get_movie(id)
    return jsonify(return_value)


@app.route("/addmovie", methods=["POST"])
def add_movie():
    request_data = request.get_json()  # getting data from client
    Movie.add_movie(request_data["title"], request_data["year"], request_data["genere"])
    response = Response("Movie added", 201, mimetype="application/json")
    return response


@app.route("/movies/<int:id>", methods=["PUT"])
def update_movie(id):
    request_data = request.get_json()
    Movie.update_movie(id, request_data["title"], request_data["year"])
    response = Response("Movie updated", status=200, mimetype="application/json")
    return response


@app.route("/movies/<int:id>", method=["DELETE"])
def remove_movie(id):
    Movie.delete_movie(id)
    response = Response("Movie Deleted", status=200, mimetype="application/json")
    return response


if __name__ == "__main__":
    app.run(port=3000, debug=True)
