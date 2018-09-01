from marshmallow import fields, Schema

from . import db


class StepModel(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    metric = db.Column(db.Integer, nullable=False)

    def __init__(self, data):
        self.name = data.get('name')
        self.metric = data.get('metric')

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
    name = fields.Int(required=True)
    metric = fields.Str(required=True)
