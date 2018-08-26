import datetime
from functools import wraps, update_wrapper

from flask import Flask, render_template, make_response

from .config import app_config
from .models import db, bcrypt

from .controllers.UserController import user_api as user_blueprint

def create_app(env_name):
    app = Flask(__name__, static_folder='../static', template_folder="../static")
    app.config.from_object(app_config[env_name])

    bcrypt.init_app(app)
    db.init_app(app)

    app.register_blueprint(user_blueprint, url_prefix='/api/v1/users')

    @app.route('/', methods=['GET'])
    def index():
        return render_template('index.html')

    @app.after_request
    def add_header(r):
        """
        Add headers to both force latest IE rendering engine or Chrome Frame,
        and also to cache the rendered page for 10 minutes.
        https://stackoverflow.com/questions/34066804/disabling-caching-in-flask
        """
        if env_name == "development":
            r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            r.headers["Pragma"] = "no-cache"
            r.headers["Expires"] = "0"
            r.headers['Cache-Control'] = 'public, max-age=0'
        return r

    return app
