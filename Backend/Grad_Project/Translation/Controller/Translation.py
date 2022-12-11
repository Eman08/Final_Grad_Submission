import os
import sys
import path
from google.cloud import translate_v3beta1 as translate
# directory = path.Path(__file__).abspath()
# sys.path.append(directory.parent.parent)
#from Controller.getFile import *
#from google.cloud import translate
os.environ['GOOGLE_APPLICATION_CREDENTIALS']= r"lawflow-translate.json"





def batch_translate_document(input_uri: str,output_uri: str,project_id: str,timeout=180,):

    client = translate.TranslationServiceClient()

    # The ``global`` location is not supported for batch translation
    location = "us-central1"

    # Google Cloud Storage location for the source input. This can be a single file
    # (for example, ``gs://translation-test/input.docx``) or a wildcard
    # (for example, ``gs://translation-test/*``).
    # Supported file types: https://cloud.google.com/translate/docs/supported-formats
    gcs_source = {"input_uri": input_uri}

    batch_document_input_configs = {
        "gcs_source": gcs_source,
    }
    gcs_destination = {"output_uri_prefix": output_uri}
    batch_document_output_config = {"gcs_destination": gcs_destination}
    parent = f"projects/{project_id}/locations/{location}"

    # Supported language codes: https://cloud.google.com/translate/docs/language
    operation = client.batch_translate_document(
        request={
            "parent": parent,
            "source_language_code": "en-US",
            "target_language_codes": ["ar-AR"],
            "input_configs": [batch_document_input_configs],
            "output_config": batch_document_output_config,
        }
    )

    print("Waiting for operation to complete...")
    #try:
    response = operation.result()

    print("Total Pages: {}".format(response.total_pages))
    #except : pass





# idd=1663507176553456
# batch_translate_document(str(getDocNameFromId(str(idd))[1]),"gs://lawflow/Translate/"+str(idd)+'/',"lawflow-3c5b7")





# def translate_document(project_id: str, idd): 

#     file_path=donwloadFromBucket(idd)
    
    
#     client = translate.TranslationServiceClient()

#     location = "us-central1"

#     parent = f"projects/{project_id}/locations/{location}"

#     # Supported file types: https://cloud.google.com/translate/docs/supported-formats
#     with open(file_path, "rb") as document:
#         document_content = document.read()
    
 
#     document_input_config = {
#         "content": document_content,
#         "mime_type": "application/pdf",
#     }
#     document_output_config = {
#         "mime_type": "application/pdf",
#     }

#     response = client.translate_document(
#         request={
#             "parent": parent,
#             "target_language_code": "fr-FR",
#             "document_input_config": document_input_config,
#             "document_output_config":document_output_config,
#         }
#     )
    
#     # To output the translated document, uncomment the code below.
#     f = open('result.pdf', 'wb')
#     f.write(response.document_translation.byte_stream_outputs[0])
#     f.close()

#     # If not provided in the TranslationRequest, the translated file will only be returned through a byte-stream
#     # and its output mime type will be the same as the input file's mime type
#     print("Response: Detected Language Code - {}".format(response.document_translation.detected_language_code))
#     # byteResponce=response.document_translation.byte_stream_outputs
#     # print(type(byteResponce))

# translate_document("lawflow-3c5b7","1662284972374343")