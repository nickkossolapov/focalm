from enum import IntEnum
from marshmallow import fields, Schema

from . import db
from .helpers.IntEnumField import IntEnumField


class IngredientUnit(IntEnum):
    GRAM = 1,
    KILOGRAM = 2,
    MILLILITRE = 3,
    LITRE = 4,
    TEASPOON = 5,
    TABLESPOON = 6,
    CUP = 7


class IngredientModel(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'), nullable=False)
    ingredient = db.Column(db.String(32), nullable=False)
    qty = db.Column(db.Float, nullable=False)
    unit = db.Column(db.Integer, nullable=False)

    def __init__(self, data):
        self.ingredient = data.get('ingredient')
        self.qty = data.get('qty')
        self.unit = int(data.get('unit'))

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        self.ingredient = data.get('qty')
        self.qty = data.get('qty')
        self.unit = data.get('unit')

    def delete(self):
        db.session.delete(self)

    def __repr(self):
        return '<id {}>'.format(self.id)


class IngredientSchema(Schema):
    id = fields.Int(dump_only=True)
    meal_id = fields.Int()
    ingredient = fields.Str(required=True)
    qty = fields.Int(required=True)
    unit = IntEnumField(IngredientUnit, required=True)
