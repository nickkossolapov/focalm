from flask import request, json, Response, Blueprint, g
from marshmallow import ValidationError

from ..models.MealModel import MealModel, MealSchema
from ..shared.Authenticiation import Auth


def create_meal_view():
    meal_api = Blueprint('meal_api', __name__)
    meal_schema = MealSchema()

    @meal_api.route('/create', methods=['POST'])
    @Auth.auth_required
    def create():
        try:
            req_data = request.get_json()
            data = meal_schema.load(req_data)

            meal = MealModel(data)
            meal.user_id = g.user.get('id')
            meal.save()

            return Response(201)
        except ValidationError as err:
            return Response(400)

    @meal_api.route('/ingredients', methods=['GET'])
    @Auth.auth_required
    def fetch_all_ingredients():
        user_id = g.user.get('id')

    return meal_api