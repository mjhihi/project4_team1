from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load the model using joblib
model = joblib.load("knn_model.pkl")

# Define the mappings from dropdown values to integers
value_mappings = {
    'capShape': {'b': 0, 'c': 1, 'x': 2, 'f': 3, 'k': 4, 's': 5},
    'capSurface': {'f': 0, 'g': 1, 'y': 2, 's': 3},
    'capColor': {'n': 0, 'b': 1, 'c': 2, 'g': 3, 'r': 4, 'p': 5, 'u': 6, 'e': 7, 'w': 8, 'y': 9},
    'bruises': {'t': 0, 'f': 1},
    'odor': {'a': 0, 'l': 1, 'c': 2, 'y': 3, 'f': 4, 'm': 5, 'n': 6, 'p': 7, 's': 8},
    'gillAttachment': {'a': 0, 'd': 1, 'f': 2, 'n': 3},
    'gillSpacing': {'c': 0, 'w': 1, 'd': 2},
    'gillSize': {'b': 0, 'n': 1},
    'gillColor': {'k': 0, 'n': 1, 'b': 2, 'h': 3, 'g': 4, 'r': 5, 'o': 6, 'p': 7, 'u': 8, 'e': 9, 'w': 10, 'y': 11},
    'stalkShape': {'e': 0, 't': 1},
    'stalkRoot': {'b': 0, 'c': 1, 'u': 2, 'e': 3, 'z': 4, 'r': 5, '?': 6},
    'stalkSurfaceAboveRing': {'f': 0, 'y': 1, 'k': 2, 's': 3},
    'stalkSurfaceBelowRing': {'f': 0, 'y': 1, 'k': 2, 's': 3},
    'stalkColorAboveRing': {'n': 0, 'b': 1, 'c': 2, 'g': 3, 'o': 4, 'p': 5, 'e': 6, 'w': 7, 'y': 8},
    'stalkColorBelowRing': {'n': 0, 'b': 1, 'c': 2, 'g': 3, 'o': 4, 'p': 5, 'e': 6, 'w': 7, 'y': 8},
    'veilColor': {'n': 0, 'o': 1, 'w': 2, 'y': 3},
    'ringNumber': {'n': 0, 'o': 1, 't': 2},
    'ringType': {'c': 0, 'e': 1, 'f': 2, 'l': 3, 'n': 4, 'p': 5, 's': 6, 'z': 7},
    'sporePrintColor': {'k': 0, 'n': 1, 'b': 2, 'h': 3, 'r': 4, 'o': 5, 'u': 6, 'w': 7, 'y': 8},
    'population': {'a': 0, 'c': 1, 'n': 2, 's': 3, 'v': 4, 'y': 5},
    'habitat': {'g': 0, 'l': 1, 'm': 2, 'p': 3, 'u': 4, 'w': 5, 'd': 6}
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        inputs = request.json
        input_values = [
            value_mappings['capShape'][inputs['capShape']],
            value_mappings['capSurface'][inputs['capSurface']],
            value_mappings['capColor'][inputs['capColor']],
            value_mappings['bruises'][inputs['bruises']],
            value_mappings['odor'][inputs['odor']],
            value_mappings['gillAttachment'][inputs['gillAttachment']],
            value_mappings['gillSpacing'][inputs['gillSpacing']],
            value_mappings['gillSize'][inputs['gillSize']],
            value_mappings['gillColor'][inputs['gillColor']],
            value_mappings['stalkShape'][inputs['stalkShape']],
            value_mappings['stalkRoot'][inputs['stalkRoot']],
            value_mappings['stalkSurfaceAboveRing'][inputs['stalkSurfaceAboveRing']],
            value_mappings['stalkSurfaceBelowRing'][inputs['stalkSurfaceBelowRing']],
            value_mappings['stalkColorAboveRing'][inputs['stalkColorAboveRing']],
            value_mappings['stalkColorBelowRing'][inputs['stalkColorBelowRing']],
            value_mappings['veilColor'][inputs['veilColor']],
            value_mappings['ringNumber'][inputs['ringNumber']],
            value_mappings['ringType'][inputs['ringType']],
            value_mappings['sporePrintColor'][inputs['sporePrintColor']],
            value_mappings['population'][inputs['population']],
            value_mappings['habitat'][inputs['habitat']]
        ]
        prediction = model.predict([input_values])[0]
        result = "Edible" if prediction == 0 else "Poisonous"
        return jsonify({'result': result})
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Log error for debugging
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
