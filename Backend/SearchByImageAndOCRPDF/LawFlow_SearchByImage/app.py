import os
import sys
import path
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from db_connection import *
initialize_app()
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
from ocrTest.view.ocr_view import ocr
from SeachByImage.NLP1_view import search
from pdfReader.view.pdfView import pdf

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_main():
    return "Hello!"


app.register_blueprint(ocr)
app.register_blueprint(search)
app.register_blueprint(pdf)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)