from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
from phi2_local_inference import generate_response

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    response = generate_response(prompt)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=5000)
