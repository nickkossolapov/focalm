from flask import Flask, render_template

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

    return app
