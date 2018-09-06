from flask import request, json, Response, Blueprint, g
from marshmallow import ValidationError

from ..models.MealModel import MealModel, MealSchema
from ..shared.Authenticiation import Auth


def create_meal_view():
    meal_api = Blueprint('meal_api', __name__)
    meal_schema = MealSchema()

    @meal_api.route('/', methods=['POST'])
    @Auth.auth_required
    def create():
        try:
            req_data = request.get_json()
            data = meal_schema.load(req_data)

            meal = MealModel(data, g.user.get('id'))
            # meal.save()

            return Response(201)
        except ValidationError as err:
            return custom_response(err.messages, 400)

    @meal_api.route('/ingredients', methods=['GET'])
    @Auth.auth_required
    def fetch_all_ingredients():
        user_id = g.user.get('id')


    def custom_response(res, status_code):  #TODO refactor/redo
        return Response(
            mimetype="application/json",
            response=json.dumps(res),
            status=status_code
        )

    return meal_api
