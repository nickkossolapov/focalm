import jwt
import os
import datetime
from flask import request, g
from functools import wraps

from src.shared.error_response_messages import ErrorResponseMessages
from src.shared.response_helpers import get_response
from ..models.user import User


def generate_token(user_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(
        payload,
        os.getenv('JWT_SECRET_KEY'),
        'HS256'
    ).decode("utf-8")


def auth_required(func):
    @wraps(func)
    def decorated_auth(*args, **kwargs):
        if 'token' not in request.headers:
            return get_response(400, {ErrorResponseMessages.TOKEN_ERROR: 'Invalid token'})

        token = request.headers.get('token')

        try:
            data = jwt.decode(token, os.getenv('JWT_SECRET_KEY'))
        except jwt.InvalidTokenError:
            return get_response(400, {ErrorResponseMessages.TOKEN_ERROR: 'Invalid token'})

        user_id = data['sub']
        check_user = User.get_one_user(user_id)
        if not check_user:
            return get_response(400, {ErrorResponseMessages.TOKEN_ERROR: 'Invalid token'})

        g.user = {'id': user_id}
        return func(*args, **kwargs)

    return decorated_auth
