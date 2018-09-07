from flask import Flask, render_template
from flask_cors import CORS

from src.services.MailService import MailService
from src.views.IngredientsView import create_ingredient_view
from src.views.MealView import create_meal_view
from src.views.UserView import create_user_view

from .config import app_config
from .models import db, bcrypt


def create_app(env_name):
    app = Flask(__name__, static_folder='../static')
    app.config.from_object(app_config[env_name])

    bcrypt.init_app(app)
    db.init_app(app)

    mail_service = MailService(app)

    app.register_blueprint(create_user_view(mail_service), url_prefix='/api/users')
    app.register_blueprint(create_meal_view(), url_prefix='/api/meals')
    app.register_blueprint(create_ingredient_view(), url_prefix='/api/ingredients')
    CORS(app)

    @app.route('/<path:path>')
    def catch_all(path):
        return render_template('index.html')

    @app.route('/')
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
