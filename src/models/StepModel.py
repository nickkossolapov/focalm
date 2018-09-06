from marshmallow import fields, Schema

from . import db


class StepModel(db.Model):
    __tablename__ = 'steps'

    id = db.Column(db.Integer, primary_key=True)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'), nullable=False)
    step = db.Column(db.String(256), nullable=False)
    order = db.Column(db.Integer, nullable=False)

    def __init__(self, data):
        self.step = data.get('step')
        self.order = data.get('order')

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
    meal_id = fields.Int()
    step = fields.Str(required=True)
    order = fields.Int(required=True)
