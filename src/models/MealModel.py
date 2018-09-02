import datetime
from marshmallow import fields, Schema
from sqlalchemy.orm import relationship

from . import db


class MealModel(db.Model):
    __tablename__ = 'meals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(256))
    servings = db.Column(db.Integer, nullable=False)
    meal_ingredients = relationship("MealIngredientsModel")
    created_at = db.Column(db.DateTime)

    def __init__(self, data):
        self.name = data.get('name')
        self.user_id = data.get('user_id')
        self.description = data.get('description')
        self.servings = data.get('servings')
        self.ingredients = data.get('ingredients')
        self.created_at = datetime.datetime.utcnow()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr(self):
        return '<id {}>'.format(self.id)


class MealSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    user_id = fields.Int(required=True)
    description = fields.Str(required=True)
    servings = fields.Int(required=True)
    created_at = fields.DateTime(dump_only=True)
