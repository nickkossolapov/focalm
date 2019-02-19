from flask import request, json, Response, Blueprint, g, make_response, jsonify
from marshmallow import ValidationError

from src.models import CalendarMeal
from src.shared.error_types import ResponseError
from src.shared.response_helpers import get_response
from ..models.meal import Meal, MealSchema
from ..shared.auth import auth_required


def create_meal_view():
    meal_api = Blueprint('meal_api', __name__)
    meal_schema = MealSchema()

    @meal_api.route('/<meal_id>', methods=['GET'])
    @auth_required
    def fetch(meal_id):
        meal = Meal.get_meal(meal_id)
        if meal.user_id != g.user.get('id'):
            return make_response(None, 403)

        return get_response(200, meal_schema.dump(meal))

    @meal_api.route('/<meal_id>', methods=['DELETE'])
    @auth_required
    def delete(meal_id):
        calendar_meals = CalendarMeal.get_calendar_by_meal(meal_id)
        for calendar_meal in calendar_meals:
            calendar_meal.delete()

        meal = Meal.get_meal(meal_id)
        meal.delete()

        return get_response(204)

    @meal_api.route('/<meal_id>', methods=['PUT'])
    @auth_required
    def update(meal_id):
        try:
            req_data = request.get_json()
            data = meal_schema.load(req_data, partial=True)

            meal = Meal.get_meal(meal_id)
            meal.update(data)

            return get_response(200, meal_schema.dump(meal))

        except ValidationError as err:
            return get_response(400, {ResponseError.VALIDATION_ERROR: err.messages})

    @meal_api.route('/', methods=['POST'])
    @auth_required
    def create():
        try:
            req_data = request.get_json()
            data = meal_schema.load(req_data)

            meal = Meal(data, g.user.get('id'))
            meal.save()

            return get_response(201, meal_schema.dump(meal))

        except ValidationError as err:
            return get_response(400, {ResponseError.VALIDATION_ERROR: err.messages})

    @meal_api.route('/', methods=['GET'])
    @auth_required
    def get_all():
        user_id = g.user.get('id')
        meals = Meal.get_all_meals_by_user(user_id)
        ser_meals = [meal_schema.dump(m) for m in meals]

        return get_response(200, ser_meals)

    return meal_api
