from flask import Blueprint, g, make_response, jsonify

from ..models.UserIngredientModel import UserIngredientModel, UserIngredientSchema
from ..shared.Authenticiation import Auth


def create_ingredients_view():
    ingredients_api = Blueprint('ingredients_api', __name__)
    ingredients_schema = UserIngredientSchema()

    @ingredients_api.route('/', methods=['GET'])
    @Auth.auth_required
    def fetch():
        ingredients = UserIngredientModel.fetch_all_user_ingredients(g.user.get('id'))
        ser_ingredients = jsonify([ingredients_schema.dump(i) for i in ingredients])
        response = make_response(ser_ingredients, 200)
        response.mimetype = "application/json"
        return response

    return ingredients_api
