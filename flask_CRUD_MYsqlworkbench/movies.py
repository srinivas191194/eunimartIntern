from settings import *
import json


db = SQLAlchemy(app)

class Movie(db.Model):
    __tablename__ = 'movie'  # creating table name
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(80),nullable = False)
    year = db.Column(db.Integer, nullable = False)
    genre = db.Column(db.String(80), nullable= False)

def json(self):
    return {'id':self.id,'title':self.title,'year':self.year,'genre':self.genre}

def add_movie(_title,_year,_genre):
    # this functon add movie to database 
    new_movie = Movie(title =_title,year = _year,genre=_genre)
    db.session.add(new_movie) # adding new movie to database
    db.session.commit() # commit  changes

def get_all_movies():
    return [Movie.json(movie) for movie in Movie.query.all()]

def get_movie(_id):
    return [Movie.json(Movie.query.filter_by(id = _id).first())]

def update_movie(_id,_title,_year,_genre):
    movie_to_update = Movie.query.filter_by(id = _id).first()
    movie_to_update.title = _title
    movie_to_update.year = _year
    movie_to_update.genre = _genre
    db.session.commit()


def delete_movie(_id):
    Movie.query.filter_by(id =_id).delete() # filter by movie id and delete the record

    db.session.commit() # In this step we are commiting the new changes


