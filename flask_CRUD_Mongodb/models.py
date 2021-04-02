from flask_mongoengine import MongoEngine

db = MongoEngine()




class Movie(db.Document): 
    movie_id = db.IntField(required = True,primary_key=True)
    title = db.StringField(required=True)
    year = db.StringField(required=True)
    genre = db.StringField(required=True)


    # def __init__(self,movie_id,title,year,genre):
    #     self.movie_id = movie_id
    #     self.title = title
    #     self.year = year
    #     self.genre=genre