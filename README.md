# focalm

A basic meal planner to save recipes, keep track of meals, and to form shopping lists.


### Dependencies

* Python 3.6+
* npm 5.6+

```
Give examples
```

### Setup

To build the React front-end, first install all the modules.

```
npm install
```

Then run the build script to generate the bundle.js and style.css files.

```
npm build
```

For the Flask back-end, first install the requirements.

```
pip install -r requirements.txt
```

The app will need the following environment variables:
* JWT_SECRET_KEY
* SQLALCHEMY_DATABASE_URI
* SERVER_NAME (URL for the server, localhost:5000 for a local server)

Additionally, if you want to use the mailer, you will need the following environment varaibles:
* MAIL_SERVER (URL for the email server)
* MAIL_USERNAME
* MAIL_PASSWORD

If all environment variables are setup, then run the app.

```
python run.py
```

## Built With

* [React](https://reactjs.org/) - Front-end
* [Flask](http://flask.pocoo.org/) - Back-end
* [SQLAlchemy](https://www.sqlalchemy.org/) - ORM
* [PostgreSQL](https://www.postgresql.org/) - Database

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
