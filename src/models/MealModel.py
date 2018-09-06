import datetime
from marshmallow import fields, Schema
from sqlalchemy.orm import relationship

from . import db
from .MealIngredientModel import MealIngredientModel, MealIngredientSchema
from .StepModel import StepModel, StepSchema


class MealModel(db.Model):
    __tablename__ = 'meals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(256))
    servings = db.Column(db.Integer, nullable=False)
    ingredients = relationship('MealIngredientModel')
    steps = relationship('StepModel')
    created_at = db.Column(db.DateTime)

    def __init__(self, data, user_id):
        self.name = data.get('name')
        self.user_id = user_id
        self.description = data.get('description')
        self.servings = data.get('servings')
        self.ingredients = [MealIngredientModel(i, user_id) for i in data.get('ingredients')]
        self.steps = [StepModel(s) for s in data.get('steps')]
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
    user_id = fields.Int()
    description = fields.Str(required=True)
    servings = fields.Int(required=True)
    ingredients = fields.Nested(MealIngredientSchema, many=True)
    steps = fields.Nested(StepSchema, many=True)
    created_at = fields.DateTime(dump_only=True)
