from datetime import datetime
from enum import IntEnum
from marshmallow import fields, Schema

from . import db
from .helpers.IntEnumField import IntEnumField


class MealTime(IntEnum):
    BREAKFAST = 1,
    LUNCH = 2,
    DINNER = 3


class CalendarMealModel(db.Model):
    __tablename__ = 'calendar_meals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'), nullable=False)
    meal_time = db.Column(db.Integer, nullable=False)
    meal_date = db.Column(db.Date, nullable=False)

    def __init__(self, data, user_id):
        self.user_id = user_id
        self.meal_id = data.get('meal_id')
        self.meal_time = int(data.get('meal_time'))
        self.meal_date = data.get('meal_date')

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

    @staticmethod
    def get_calendar_meals_by_user(user_id):
        return CalendarMealModel.query.filter_by(user_id=user_id).all()

    def __repr(self):
        return '<id {}>'.format(self.id)


class CalendarMealSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    meal_id = fields.Int(required=True)
    meal_time = IntEnumField(MealTime, required=True)
    meal_date = fields.DateTime('%Y%m%d', required=True)
