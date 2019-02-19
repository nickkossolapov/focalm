from flask import Blueprint, g, make_response, jsonify

from src.shared.response_helpers import get_response
from ..models.user_ingredient import UserIngredient, UserIngredientSchema
from ..shared.auth import auth_required


def create_ingredients_view():
    ingredients_api = Blueprint('ingredients_api', __name__)
    ingredients_schema = UserIngredientSchema()

    @ingredients_api.route('/', methods=['GET'])
    @auth_required
    def fetch():
        ingredients = UserIngredient.fetch_all_user_ingredients(g.user.get('id'))
        ser_ingredients = [ingredients_schema.dump(i) for i in ingredients]

        return get_response(200, ser_ingredients)

    return ingredients_api
