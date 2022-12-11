const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const { createReadStream } = require('original-fs');
const util = require("util");
const Multer = require("multer");
const maxSize = 2 * 1024 * 1024;

//const bucketName = 'lawflow.json';
const bucketName = 'gcloudconnection.json'
const GOOGLE_CLOUD_PROJECT_ID = 'lawflow-3c5b7';

var element = document.getElementById("log-in")

element.onclick = async function onclick(){
const gc =new Storage({
    projectId : GOOGLE_CLOUD_PROJECT_ID,
    keyFilename : bucketName
})

const Bucket= gc.bucket('lawflow');
const file = Bucket.file('testtrial');
//-
fs.createReadStream('/Users/Eman/Desktop/grad_front_end_electron/electron-quick-start/Grad-_Project_Front_End-1/connect-to-gcloud/info.txt')
  .pipe(file.createWriteStream())
  .on('error', function(err) {
    console.log(err)
  })
  .on('finish', function() {
    console.log("DONE");
  });

}
