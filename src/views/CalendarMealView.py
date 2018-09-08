from flask import request, json, Response, Blueprint, g, jsonify, make_response
from marshmallow import ValidationError

from ..models.CalendarMealModel import CalendarMealModel, CalendarMealSchema
from ..shared.Authenticiation import Auth


def create_calender_meal_view():
    calendar_meal_api = Blueprint('meal_calendar_api', __name__)
    calendar_meal_schema = CalendarMealSchema()

    @calendar_meal_api.route('/', methods=['POST'])
    @Auth.auth_required
    def create():
        try:
            req_data = request.get_json()
            data = calendar_meal_schema.load(req_data)

            calendar_meal = CalendarMealModel(data, g.user.get('id'))
            calendar_meal.save()

            return Response(status=201)
        except ValidationError as err:
            return Response(status=400)

    return calendar_meal_api