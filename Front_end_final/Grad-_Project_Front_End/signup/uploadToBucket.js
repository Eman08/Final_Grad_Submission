// // 'use strict';

// const { File } = require("@google-cloud/storage");
// const { Console } = require("console");

// // sample-metadata:
// //   title: Upload a directory to a bucket.
// //   description: Uploads full hierarchy of a local directory to a bucket.
// //   usage: node files.js upload-directory <bucketName> <directoryPath>

// var userEnteredFilePath='C:\Users\SHAMS\Desktop\design_doc_final.docx';

// var dirFromFilePath=userEnteredFilePath.substring(0, userEnteredFilePath.lastIndexOf("/"));

// var Filename=userEnteredFilePath.split("/").pop()

// //console.log(Filename)
// //console.log(Filename[Filename.length-1]);

// var oppositSlash=userEnteredFilePath.replaceAll('/','\\')
// //console.log(oppositSlash)


// var button = document.getElementById("uploadbucket")
// button.onclick = function main( bucketName = 'lawflow',directoryPath = dirFromFilePath,wantedFile=userEnteredFilePath ) {
//   // [START upload_directory]
//   /**
//    * TODO(developer): Uncomment the following lines before running the sample.
//    */
//   // The ID of your GCS bucket
//   // const bucketName = 'your-unique-bucket-name';

//   // The local directory to upload
//   // const directoryPath = './local/path/to/directory';

//   // Imports the Google Cloud client library
//   const {Storage} = require('@google-cloud/storage');

//   // Creates a client
//   const storage = new Storage();

//   const {promisify} = require('util');
//   const fs = require('fs');
//   const path = require('path');

//   const readdir = promisify(fs.readdir);
//   const stat = promisify(fs.stat);

//   async function* getFiles(directory = '.') {
//     for (const file of await readdir(directory)) {
//       const fullPath = path.join(directory, file);
//       const stats = await stat(fullPath);

//       if (stats.isDirectory()) {
//         yield* getFiles(fullPath);
//       }

//       if (stats.isFile()) {
//         yield fullPath;
//       }
//     }
//   }

//   async function uploadDirectory() {
//     const bucket = storage.bucket(bucketName);
//     let successfulUploads = 0;

//     for await (const filePath of getFiles(directoryPath)) {
//       try {
//         const dirname = path.dirname(directoryPath);
//         var destination = path.relative(dirname, filePath);

//         wantedFile=wantedFile.replaceAll('/','\\')           //Change the slashes of the file path if opposit is detected 
//         destination=destination.split("\\").pop()           // remove the directory name from the file name that is to be uploaded to bucket


//         if (filePath == wantedFile){
//         await bucket.upload(filePath, {destination});

//         console.log(`Successfully uploaded: ${filePath}`);
//         successfulUploads++;
//         }
//       } catch (e) {
//         console.error(`Error uploading ${filePath}:`, e);
//       }
//     }

//     console.log(
//       `${successfulUploads} files uploaded to ${bucketName} successfully.`
//     );
//   }

//   uploadDirectory().catch(console.error);
//   // [END upload_directory]
// }


document.getElementById("uploadbucket").onclick = async function main() {
// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

async function main(){
// Creates a GCP Storage client
const Bucket = 'gcloudconnection.json'
const GOOGLE_CLOUD_PROJECT_ID = 'lawflow-3c5b7';
// Creates a client
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({ keyFilename: './gcloudconnection.json' });
// Replace with your bucket name and filename.
const bucketname = 'lawflow';
const filename = 'signup.html';

const res = await storage.bucket(bucketname).upload('./' + filename);
// `mediaLink` is the URL for the raw contents of the file.
const url = res[0].metadata.mediaLink;

// Need to make the file public before you can access it.
//await storage.bucket(bucketname).file(filename).makePublic();
// Need to make the file public before you can access it.
await storage.bucket(bucketname).file(filename).makePublic();

// Make a request to the uploaded URL.
const axios = require('axios');
const pkg = await axios.get(url).then(res => res.data);
console.log(pkg.name); // 'masteringjs.io'

}
}

//main(...process.argv.slice(2));