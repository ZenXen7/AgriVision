from flask import Flask, jsonify, request
import pandas as pd
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from io import BytesIO


# Load the model

app = Flask(__name__)

model = load_model('finalcropnoses.keras')

class_names = ['Bacterial', 'Fungal', 'Healthy']


@app.route('/')
def home():
    return jsonify({"message": "Flask is working!"})

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    img_file = request.files['image']

    if img_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Load and preprocess the image
    img = image.load_img(BytesIO(img_file.read()), target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  
    img_array /= 255.0  
    
    # Predict
    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions)
    predicted_class = class_names[predicted_index]
    confidence = float(predictions[0][predicted_index])

    return jsonify({
        "predicted_class": predicted_class,
        "confidence": round(confidence, 4)
    })




if __name__ == '__main__':
    app.run(debug=True)
