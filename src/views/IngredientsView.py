from flask import request, json, Response, Blueprint, g, jsonify, make_response
from marshmallow import ValidationError

from ..models.IngredientModel import IngredientSchema, IngredientModel
from ..shared.Authenticiation import Auth


def create_ingredient_view():
    ingredient_api = Blueprint('ingredient_api', __name__)
    ingredient_schema = IngredientSchema()

    @ingredient_api.route('/', methods=['GET'])
    @Auth.auth_required
    def fetch_ingredients_by_user():
        try:
            user_id = g.user.get('id')
            ingredients = IngredientModel.get_by_user_id(user_id)
            ser_ingredients = jsonify([ingredient_schema.dump(i) for i in ingredients])

            response = make_response(ser_ingredients, 200)
            response.mimetype = "application/json"

            return response
        except ValidationError as err:
            return Response(status=400)

    return ingredient_api
