import PyPDF2

import os 
# gcs_file_system = gcsfs.GCSFileSystem(project="lawflow-3c5b7")
# gcs_pdf_path = "gs://lawflow/PDF/legal.pdf04_09_2022 10_59_36"


def readPdfFile(path):
    pdfFileObj = open(path, 'rb')
    # creating a pdf reader object
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    # creating a page object
    pageObj = pdfReader.getPage(0)
    # extracting text from page
    pdfToStr=pageObj.extract_text()
    # closing the pdf file object
    pdfFileObj.close()
    return pdfToStr

#print(readPdfFile("Grad_Project\pdfReader\legal.pdf"))

def strToList(path):
    pdfStr=readPdfFile(path)
    pdfList=pdfStr.split()
    pdfList.append("testimonal")
    return pdfList
#strToList("Grad_Project\pdfReader\legal.pdf")
