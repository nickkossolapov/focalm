from enum import Enum
from marshmallow import fields, Schema
from marshmallow_enum import EnumField

from . import db


class MealMetric(Enum):
    TEASPOON = 1,
    TABLESPOON = 2,
    CUP = 3,
    MILLILITRE = 4,
    LITRE = 5,
    GRAM = 6,
    KILOGRAM = 7

    def __int__(self):
        return self.value[0]


class IngredientModel(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'), nullable=False)
    ingredient = db.Column(db.String(32), nullable=False)
    qty = db.Column(db.Integer, nullable=False)
    metric = db.Column(db.Integer, nullable=False)

    def __init__(self, data):
        self.ingredient = data.get('ingredient')
        self.qty = data.get('qty')
        self.metric = int(data.get('metric'))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        self.ingredient = data.get('qty')
        self.qty = data.get('qty')
        self.metric = data.get('metric')

    def delete(self):
        db.session.delete(self)

    def __repr(self):
        return '<id {}>'.format(self.id)


class IngredientSchema(Schema):
    id = fields.Int(dump_only=True)
    meal_id = fields.Int()
    ingredient = fields.Str(required=True)
    qty = fields.Int(required=True)
    metric = EnumField(MealMetric, required=True)
