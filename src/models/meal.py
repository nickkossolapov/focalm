import datetime
from marshmallow import fields, Schema
from sqlalchemy.orm import relationship

from . import db
from .ingredients import Ingredient, IngredientSchema
from .step import Step, StepSchema


class Meal(db.Model):
    __tablename__ = 'meals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(256))
    servings = db.Column(db.Integer, nullable=False)
    ingredients = relationship('Ingredient', cascade='save-update, delete, delete-orphan')
    steps = relationship('Step', cascade='save-update, delete, delete-orphan')
    created_at = db.Column(db.DateTime)

    def __init__(self, data, user_id):
        self.name = data.get('name')
        self.user_id = user_id
        self.description = data.get('description')
        self.servings = data.get('servings')
        if 'ingredients' in data:
            self.ingredients = [Ingredient(i) for i in data['ingredients']]
        if 'steps' in data:
            self.steps = [Step(s) for s in data['steps']]
        self.created_at = datetime.datetime.utcnow()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data):
        self.name = data.get('name')
        self.description = data.get('description')
        self.servings = data.get('servings')
        self.ingredients = [Ingredient(i) for i in data.get('ingredients')]
        self.steps = [Step(s) for s in data.get('steps')]

        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def get_all_meals_by_user(user_id):
        return Meal.query.filter_by(user_id=user_id).all()

    @staticmethod
    def get_meal(meal_id):
        return Meal.query.filter_by(id=meal_id).first()

    def __repr(self):
        return '<id {}>'.format(self.id)


class MealSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    user_id = fields.Int()
    description = fields.Str(required=True)
    servings = fields.Int(required=True)
    ingredients = fields.Nested(IngredientSchema, many=True)
    steps = fields.Nested(StepSchema, many=True)
    created_at = fields.DateTime()
