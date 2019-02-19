from flask import request, Blueprint, g
from marshmallow import ValidationError

from src.shared.error_types import ResponseError
from src.shared.response_helpers import get_response
from ..models.user import User, UserSchema
from ..shared.auth import auth_required, generate_token


def create_user_view(mail_service):
    user_api = Blueprint('user_api', __name__)
    user_schema = UserSchema()
    _mail_service = mail_service

    @user_api.route('/signup', methods=['POST'])
    def create():
        try:
            req_data = request.get_json()
            data = user_schema.load(req_data)
            user_in_db = User.get_user_by_email(data.get('email'))
            if user_in_db:
                message = {'error': 'User already exists'}
                return get_response(409, message)

            user = User(data)
            user.save()

            ser_data_id = user_schema.dump(user).get('id')
            token = generate_token(ser_data_id)
            return get_response(201, {'token': token})

        except ValidationError as err:
            return get_response(400, {ResponseError.VALIDATION_ERROR: err.messages})

    @user_api.route('/signin', methods=['POST'])
    def login():
        try:
            req_data = request.get_json()
            data = user_schema.load(req_data, partial=True)

            if not data.get('email') or not data.get('password'):
                return get_response(400, {'error': 'Email and password are required'})

            user = User.get_user_by_email(data.get('email'))

            if not user:
                return get_response(401, {ResponseError.CREDENTIALS_ERROR: 'Invalid credentials'})
            if not user.check_hash(data.get('password')):
                return get_response(401, {ResponseError.CREDENTIALS_ERROR: 'Invalid credentials'})

            ser_data_id = user_schema.dump(user).get('id')
            token = generate_token(ser_data_id)
            return get_response(200, {'token': token})

        except ValidationError as err:
            return get_response(400, {ResponseError.VALIDATION_ERROR: err.messages})

    @user_api.route('/me', methods=['PUT'])
    @auth_required
    def update():
        try:
            req_data = request.get_json()
            data = user_schema.load(req_data, partial=True)

            user = User.get_one_user(g.user.get('id'))
            user.update(data)

            return get_response(200, user_schema.dump(user))

        except ValidationError as err:
            return get_response(400, {ResponseError.VALIDATION_ERROR: err.messages})

    @user_api.route('/me', methods=['DELETE'])
    @auth_required
    def delete():
        user = User.get_one_user(g.user.get('id'))
        user.delete()
        return get_response(204)

    @user_api.route('/me', methods=['GET'])
    @auth_required
    def get_me():
        user = User.get_one_user(g.user.get('id'))
        ser_user = user_schema.dump(user)
        return get_response(200, ser_user)

    return user_api
