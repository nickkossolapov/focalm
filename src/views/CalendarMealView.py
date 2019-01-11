from flask import request, Response, Blueprint, g, jsonify, make_response
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
            ser_meal = jsonify(calendar_meal_schema.dump(calendar_meal))

            response = make_response(ser_meal, 201)
            response.mimetype = "application/json"
            return response
        except ValidationError as err:
            return Response(status=400)

    @calendar_meal_api.route('/', methods=['GET'])
    @Auth.auth_required
    def get_all():
        user_id = g.user.get('id')
        calendar_meals = CalendarMealModel.get_calendar_meals_by_user(user_id)
        ser_meals = jsonify([calendar_meal_schema.dump(m) for m in calendar_meals])

        response = make_response(ser_meals, 200)
        response.mimetype = "application/json"
        return response

    @calendar_meal_api.route('/<calendar_meal_id>', methods=['DELETE'])
    @Auth.auth_required
    def delete(calendar_meal_id):
        meal = CalendarMealModel.get_calendar_meal(calendar_meal_id)
        meal.delete()

        return make_response('', 204)

    return calendar_meal_api
