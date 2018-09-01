from marshmallow import fields, Schema
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

from . import db

Base = declarative_base()


class MealIngredientsModel(Base):
    __tablename__ = 'meal_ingredients'

    id = db.Column(db.Integer, primary_key=True)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'), nullable=False)
    ingredient = relationship("IngredientModel")
    qty = db.Column(db.Integer, nullable=False)

    def __init__(self, data):
        self.step = data.get('step')
        self.order = data.get('step')

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


class StepSchema(Schema):
    id = fields.Int(dump_only=True)
    meal_id = fields.Int(required=True)
    ingredient_id = fields.Int(required=True)
    qty = fields.Int(required=True)
