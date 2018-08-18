from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

from .BlogpostModel import BlogpostModel, BlogpostSchema
from .UserModel import UserModel, UserSchema
