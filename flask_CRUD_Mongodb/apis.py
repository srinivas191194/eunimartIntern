from models import Movie,db
from flask import jsonify,Flask,request
import json


app = Flask(__name__)
db.init_app(app)


app.config['MONGODB_SETTINGS']={
    'db':'MyDataBase',
    'host':'localhost',
    'port':'27017',
}



@app.route('/getMovies',methods=["GET"])
def get_movies():
    Movies = Movie.objects()
    return jsonify(Movies),200



@app.route('/addMovie',methods=["POST"])
def add_movie():
    record = json.loads(request.data)
    print(record['movie_id'])
    movie = Movie(movie_id = record['movie_id'],title=record['title'],year = record['year'],genre = record['genre'])
    movie.save()
    return jsonify(movie.to_json())


@app.route('/deleteMovie',methods=['DELETE'])
def delete_movie():
    record = json.loads(request.data)
    movie = Movie.objects(movie_id=record['movie_id']).first()  
    if not movie:
        return jsonify({'error':'data not found'})
    else:
        movie.delete()    
    return jsonify(movie.to_json())


@app.route('/updateMovie',methods=['PATCH'])
def update_record():
    record = json.loads(request.data)
    movie = Movie.objects(movie_id = record['movie_id']).first()
    if not movie:
        return jsonify({'error': "data not found"})
    else:
        movie.update(year = record['year']) 
    return jsonify(movie.to_json())      

   
if __name__ == "__main__":
    app.run(debug=True)