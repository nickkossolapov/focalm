from marshmallow import fields, Schema

from . import db
from .helpers.IntEnumField import IntEnumField
from .ingredients import IngredientUnit


class UserIngredient(db.Model):
    __tablename__ = 'user_ingredients'

    user_id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.String(32), db.ForeignKey('meals.id'), nullable=False)
    metric = db.Column(db.Integer, nullable=False)

    @staticmethod
    def fetch_all_user_ingredients(user_id):
        return UserIngredient.query.filter_by(user_id=user_id).all()

    def __repr(self):
        return '<id {}>'.format(self.id)


class UserIngredientSchema(Schema):
    ingredient = fields.Str(dump_only=True)
    metric = IntEnumField(IngredientUnit, dump_only=True)
