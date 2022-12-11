
from datetime import datetime
import os
import smtplib
from email.message import EmailMessage
import ssl

sender="lawflownotif@gmail.com"
emailpassword='jrttbvnuldwhwyzb'       #NOT ACTUAL EMAIL PASSWORD, BUT STILL NEED TO OPEN EMAIL 
reciver="harmanhssingh2001@gmail.com"


def sendEmail(Subject, Body, reciever):
    subject= Subject
    body= Body
    
    for i in reciever:
        em=EmailMessage()                                               #setting up format and content for the email
        em['From']=sender
        em['To']=i
        em['Subject']=subject
        em.set_content(body)

        context=ssl.create_default_context()
        with smtplib.SMTP('smtp.gmail.com',587) as smtp:                #creating ssl connection using tls
            #smtp.set_debuglevel(1)
            #smtp.ehlo()
            smtp.starttls(context=context)
            smtp.login(sender,emailpassword)
            smtp.sendmail(sender,i,em.as_string())