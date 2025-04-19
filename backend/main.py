from flask import Flask, jsonify, request
from flask import Blueprint
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from auth.routes import auth_bp
from auth.models import db
from predict.routes import predict_bp
from flask_cors import CORS



app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)



db = SQLAlchemy(app)    
# db.init_app(app)
migrate = Migrate(app, db)


app.register_blueprint(predict_bp, url_prefix='/api/predict')
app.register_blueprint(auth_bp, url_prefix='/api/auth')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)