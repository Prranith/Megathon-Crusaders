from flask import Flask, request, jsonify
import requests
import tensorflow as tf

app = Flask(__name__)

# Load your model
model = tf.keras.models.load_model('best_model.h5')

# Function to fetch satellite image from Google Earth Engine
def get_satellite_image(lon, lat):
    # Replace this with your logic to fetch the image from GEE
    # For now, this is just a placeholder return
    return f"https://example.com/satellite_image/{lat}_{lon}.png"

# Function to run the model prediction
def run_model(image_url):
    # Implement the actual image loading and prediction logic here
    # For now, let's just return a dummy prediction
    return "Flood Occurrence Likely"

@app.route('/get_image', methods=['POST'])
def get_image():
    data = request.json
    lon = data['longitude']
    lat = data['latitude']
    
    image_url = get_satellite_image(lon, lat)
    prediction_result = run_model(image_url)

    return jsonify({'image_url': image_url, 'prediction': prediction_result})

if __name__ == '__main__':
    app.run(debug=True)
