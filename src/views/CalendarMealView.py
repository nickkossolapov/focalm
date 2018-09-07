from flask import request, json, Response, Blueprint, g, jsonify, make_response
from marshmallow import ValidationError

from ..models.CalendarMealModel import CalendarMealModel, CalendarMealSchema
from ..shared.Authenticiation import Auth


def create_ingredient_view():
    calendar_meal_api = Blueprint('meal_calendar_api', __name__)
    calendar_meal_schema = CalendarMealSchema()

    return calendar_meal_api