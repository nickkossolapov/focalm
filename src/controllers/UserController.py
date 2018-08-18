from flask import request, json, Response, Blueprint, g
from marshmallow import ValidationError

from ..models.UserModel import UserModel, UserSchema
from ..shared.Authenticiation import Auth

user_api = Blueprint('user_api', __name__)
user_schema = UserSchema()


@user_api.route('/', methods=['POST'])
def create():
    try:
        req_data = request.get_json()
        data = user_schema.load(req_data)
        user_in_db = UserModel.get_user_by_email(data.get('email'))
        if user_in_db:
            message = {'error': 'User already exist, please supply another email address'}
            return custom_response(message, 400)

        user = UserModel(data)
        user.save()
        ser_data_id = user_schema.dump(user).get('id')
        token = Auth.generate_token(ser_data_id)
        return custom_response({'jwt_token': token}, 201)

    except ValidationError as err:
        return custom_response(err, 400)


@user_api.route('/login', methods=['POST'])
def login():
    try:
        req_data = request.get_json()
        data = user_schema.load(req_data, partial=True)

        if not data.get('email') or not data.get('password'):
            return custom_response({'error': 'You need email and password to sign in'}, 400)

        user = UserModel.get_user_by_email(data.get('email'))

        if not user:
            return custom_response({'error': 'Invalid credentials'}, 400)
        if not user.check_hash(data.get('password')):
            return custom_response({'error': 'Invalid credentials'}, 400)

        ser_data_id = user_schema.dump(user).get('id')
        token = Auth.generate_token(ser_data_id)

        return custom_response({'jwt_token': token}, 200)

    except ValidationError as err:
        return custom_response(err, 400)


@user_api.route('/me', methods=['PUT'])
@Auth.auth_required
def update():
    try:
        req_data = request.get_json()
        data = user_schema.load(req_data, partial=True)

        user = UserModel.get_one_user(g.user.get('id'))
        user.update(data)
        ser_user = user_schema.dump(user)

        return custom_response(ser_user, 200)

    except ValidationError as err:
        return custom_response(err, 400)


@user_api.route('/me', methods=['DELETE'])
@Auth.auth_required
def delete():
    user = UserModel.get_one_user(g.user.get('id'))
    user.delete()
    return custom_response({'message': 'deleted'}, 204)


@user_api.route('/me', methods=['GET'])
@Auth.auth_required
def get_me():
    user = UserModel.get_one_user(g.user.get('id'))
    ser_user = user_schema.dump(user)
    return custom_response(ser_user, 200)


def custom_response(res, status_code):
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )