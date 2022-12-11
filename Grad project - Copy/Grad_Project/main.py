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
from Appointments.views.views_appointments import Appointments
from login_modules.view.view_login import login
from search_file.view.view_searchFile import searchFile
from contacts.view.view_contacts import contacts
from case_structuring.view.view_case import case
from to_do_lists.view.view_to_do_list import todolist
from SearchByTag.SearchByTag_View import searchByTag
from WorkFlow1.workflowView import WF
from Email.sendEmailView import Email
from Analytics.analytics_view import analytics
from notifications.notifications_view import notifications
from add_documents.add_documents_view import addDocs
from categories.category_view import categoriesDocs
from search_file_name_case.search_file_name_case_view import caseSearch
from filters.filter_view import filter
from delete_files.delete_files_view import delete_file
from search_client_name.search_client_view import clientSearch
from Translation.View.translationView import Translation

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_main():
    return "Hello!"

app.register_blueprint(Appointments)
app.register_blueprint(login)
app.register_blueprint(contacts)
app.register_blueprint(case)
app.register_blueprint(todolist)
app.register_blueprint(searchFile)
app.register_blueprint(searchByTag)
app.register_blueprint(WF)
app.register_blueprint(Email)
app.register_blueprint(analytics)
app.register_blueprint(notifications)
app.register_blueprint(addDocs)
app.register_blueprint(categoriesDocs)
app.register_blueprint(caseSearch)
app.register_blueprint(filter)
app.register_blueprint(delete_file)
app.register_blueprint(clientSearch)
app.register_blueprint(Translation)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
