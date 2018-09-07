import datetime
from enum import Enum

from marshmallow import fields, Schema
from sqlalchemy.orm import relationship

from . import db


class MealTime(Enum):
    BREAKFAST = 1,
    LUNCH = 2,
    DINNER = 3


class CalendarMealModel(db.Model):
    __tablename__ = 'calendar_meals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'), nullable=False)
    meal = relationship('MealModel')
    meal_time = db.Column(db.String(16), Enum(MealTime),nullable=False)
    meal_date = db.Column(db.DateTime, nullable=False)

    def __init__(self, data, user_id):
        self.name = data.get('name')
        self.user_id = data.get('user_id')
        self.servings = data.get('servings')
        self.meal_time = data.get('meal_time')
        self.meal_date = datetime.datetime.utcnow()

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


class CalendarMealSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    meal_id = fields.Int(required=True)
    meal_time = fields.DateTime(required=True)
    meal_date = fields.DateTime(required=True)
