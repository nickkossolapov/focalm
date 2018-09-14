from flask import request, json, Response, Blueprint, g, make_response, jsonify
from marshmallow import ValidationError

from src.models import CalendarMealModel
from ..models.MealModel import MealModel, MealSchema
from ..shared.Authenticiation import Auth


def create_meal_view():
    meal_api = Blueprint('meal_api', __name__)
    meal_schema = MealSchema()

    @meal_api.route('/<meal_id>', methods=['GET'])
    @Auth.auth_required
    def fetch(meal_id):
        meal = MealModel.get_meal(meal_id)
        if meal.user_id != g.user.get('id'):
            return make_response(None, 403)

        ser_meal = jsonify(meal_schema.dump(meal))

        response = make_response(ser_meal, 200)
        response.mimetype = "application/json"
        return response

    @meal_api.route('/<meal_id>', methods=['DELETE'])
    @Auth.auth_required
    def delete(meal_id):
        calendar_meals = CalendarMealModel.get_calendar_by_meal(meal_id)
        for calendar_meal in calendar_meals:
            calendar_meal.delete()

        meal = MealModel.get_meal(meal_id)
        meal.delete()

        return make_response(None, 204)

    @meal_api.route('/', methods=['POST'])
    @Auth.auth_required
    def create():
        try:
            req_data = request.get_json()
            data = meal_schema.load(req_data)

            meal = MealModel(data, g.user.get('id'))
            meal.save()

            return Response(status=201)
        except ValidationError as err:
            return custom_response(err.messages, 400)

    @meal_api.route('/', methods=['GET'])
    @Auth.auth_required
    def get_all():
        user_id = g.user.get('id')
        meals = MealModel.get_all_meals_by_user(user_id)
        ser_meals = jsonify([meal_schema.dump(m) for m in meals])

        response = make_response(ser_meals, 200)
        response.mimetype = "application/json"
        return response

    def custom_response(res, status_code):  #TODO refactor/redo
        return Response(
            mimetype="application/json",
            response=json.dumps(res),
            status=status_code
        )

    return meal_api
