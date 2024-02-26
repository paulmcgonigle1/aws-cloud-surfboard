from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import boto3
import uuid
import requests
import logging


# setting up logging
logging.basicConfig(level=logging.DEBUG)
# setting up
app = Flask(__name__)
# using cors
CORS(app, origins=["http://localhost:3000"])

API_GATEWAY_BASE_URL = "https://xur7uj74uh.execute-api.eu-west-1.amazonaws.com/dev"
# Assume you have an endpoint variable stored somewhere
API_GATEWAY_ENDPOINT = (
    "https://xur7uj74uh.execute-api.eu-west-1.amazonaws.com/dev/upload"
)


# delete by ID
@app.route("/deleteById/<surfboardId>", methods=["DELETE"])
def delete_surfboard(surfboardId):
    # Invoke Lambda via API Gateway
    price = request.args.get("price")
    api_gateway_url = f"{API_GATEWAY_BASE_URL}/surfboards/{surfboardId}?price={price}"

    response = requests.delete(api_gateway_url)
    logging.debug(f"Received response from Lambda: {response.text}")
    # Handle response (e.g., check for success/failure)
    print("Response data:", response)

    if response.status_code == 200:

        return jsonify({"Success": "Surfboard has been deleted"}), 200
    else:
        return (
            jsonify({"error": "Failed to delete surfboard "}),
            response.status_code,
        )


# getting all boards
@app.route("/getAllBoards", methods=["GET"])
def get_all_boards():
    # Invoke Lambda via API Gateway
    api_gateway_url = f"{API_GATEWAY_BASE_URL}/surfboards"

    response = requests.get(api_gateway_url)
    logging.debug(f"Received response from Lambda: {response.text}")
    # Handle response (e.g., check for success/failure)
    print("Response data:", response)

    if response.status_code == 200:
        surfboards_data = response.json()  # Assuming the response from Lambda is JSON
        return jsonify(surfboards_data), 200
    else:
        return (
            jsonify({"error": "Failed to upload "}),
            response.status_code,
        )


# upload by file
@app.route("/upload", methods=["POST"])
def upload_file():
    files = request.files.getlist("file")  # Assuming files are sent with 'file' key
    for file in files:
        logging.debug(f"Processing file: {file.filename}")

        file_content = file.read()
        file_json = json.loads(file_content.decode("utf-8"))

        # assuming  Lambda expects JSON with my specific structure
        payload = {
            "fileName": file.filename,
            "fileContent": file_json,  # Send file content as JSON data
        }
        logging.debug(f"Sending payload to Lambda: {payload}")

        # invoking the api gateway
        response = requests.post(API_GATEWAY_ENDPOINT, json=payload)
        logging.debug(f"Received response from Lambda: {response.text}")
        # Handle response (e.g., check for success/failure)

    return jsonify({"message": "Files uploaded successfully"})


if __name__ == "__main__":
    app.run(debug=True)
