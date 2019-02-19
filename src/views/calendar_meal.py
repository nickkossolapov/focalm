from flask import request, Blueprint, g
from marshmallow import ValidationError

from src.shared.error_types import ResponseError
from src.shared.response_helpers import get_response
from ..models.calendar_meal import CalendarMeal, CalendarMealSchema
from ..shared.auth import auth_required


def create_calender_meal_view():
    calendar_meal_api = Blueprint('meal_calendar_api', __name__)
    calendar_meal_schema = CalendarMealSchema()

    @calendar_meal_api.route('/', methods=['POST'])
    @auth_required
    def create():
        try:
            req_data = request.get_json()
            data = calendar_meal_schema.load(req_data)

            calendar_meal = CalendarMeal(data, g.user.get('id'))
            calendar_meal.save()
            ser_meal = calendar_meal_schema.dump(calendar_meal)

            return get_response(201, ser_meal)
        except ValidationError as err:
            return get_response(400, {ResponseError.VALIDATION_ERROR: err.messages})

    @calendar_meal_api.route('/', methods=['GET'])
    @auth_required
    def get_all():
        user_id = g.user.get('id')
        calendar_meals = CalendarMeal.get_calendar_meals_by_user(user_id)
        ser_meals = [calendar_meal_schema.dump(m) for m in calendar_meals]

        return get_response(201, ser_meals)

    @calendar_meal_api.route('/<calendar_meal_id>', methods=['DELETE'])
    @auth_required
    def delete(calendar_meal_id):
        meal = CalendarMeal.get_calendar_meal(calendar_meal_id)
        meal.delete()

        return get_response(204)

    return calendar_meal_api
