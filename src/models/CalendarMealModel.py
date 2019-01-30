from marshmallow import fields, Schema

from . import db


class CalendarMealModel(db.Model):
    __tablename__ = 'calendar_meals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'), nullable=False)
    date_id = db.Column(db.Integer, nullable=False)

    def __init__(self, data, user_id):
        self.user_id = user_id
        self.meal_id = data.get('meal_id')
        self.date_id = data.get('date_id')

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

    @staticmethod
    def get_calendar_meal(calendar_meal_id):
        return CalendarMealModel.query.filter_by(id=calendar_meal_id).first()

    @staticmethod
    def get_calendar_by_meal(meal_id):
        return CalendarMealModel.query.filter_by(meal_id=meal_id).all()

    def __repr(self):
        return '<id {}>'.format(self.id)


class CalendarMealSchema(Schema):
    id = fields.Int(dump_only=True)
    meal_id = fields.Int(required=True)
    date_id = fields.Int(required=True)
