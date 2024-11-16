from . import db

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100), unique=True)
    Average = db.Column(db.Integer)
    Total_score = db.Column(db.Integer)
