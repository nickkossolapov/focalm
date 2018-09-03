from flask import request, json, Response, Blueprint, g
from marshmallow import ValidationError

from ..models.MealModel import MealModel, MealSchema
from ..shared.Authenticiation import Auth


def create_meal_view():
    meal_api = Blueprint('meal_api', __name__)
    meal_schema = MealSchema()


    return meal_api