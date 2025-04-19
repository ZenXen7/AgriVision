from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class ScanHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    disease = db.Column(db.String(50), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    image_data = db.Column(db.LargeBinary, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('scan_history', lazy=True))