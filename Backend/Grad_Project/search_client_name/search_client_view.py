import os
import path
import sys
import time
from flask import Flask, request, json, Blueprint
from flask_restful import Resource, Api, reqparse
directory = path.Path(__file__).abspath()
sys.path.append(directory.parent)
from search_client_name.search_client_controller import *

clientSearch = Blueprint('clientSearch',__name__, url_prefix = '/clientSearch')

@clientSearch.route("/getAllClientDetails", methods=['POST'])
def getClientDetailsView():
    data=json.loads(request.data)
    time.sleep(1)
    client_name = data["client_name"]
    return getClientDetails(client_name)
