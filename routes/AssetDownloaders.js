const request = require("request-promise-native"); 
const fs = require("fs");
var mockData = require("./__mock/data");

var pdfName = randomNameGenerator();
var videoName = randomNameGenerator();

let savedFilesPath = {
    pdfFiles :{},
    videoFiles: {}
}

async function getAssets(userName, userData) {
        
    if(userData.videoLinks){
        await Promise.all(
            userData.videoLinks.map( async (videos,index) =>{
                await downloadVideo(videos.video,`${global.appRoot}/user_data/${userName}/${videoName}-${index}.mp4`,index, userName);
            })
        );
    }
    if(userData.fileLinks){
        await Promise.all(
            userData.fileLinks.map( async (files,index) =>{
                await downloadPDF(files.file,`${global.appRoot}/user_data/${userName}/${pdfName}-${index}.pdf`,index, userName);
            })
        );
    }
    console.log("Returning the the Saved File Path for -->",userName);
    return savedFilesPath;

  }

async function downloadPDF(pdfURL, outputFilename,index,userName) {
    
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
    const pdfData = {
      id : 111,
      link : `./${pdfName}-${index}.pdf`,
      name:"someName"
    }
    if(!savedFilesPath.pdfFiles[userName]){
        savedFilesPath.pdfFiles[userName] = [];
    }
    savedFilesPath.pdfFiles[userName].push(pdfData);
}

async function downloadVideo(videoUrl, outputFilename,index,userName) {
    
    let videoBuffer = await request.get({uri: videoUrl, encoding: null});
    console.log("Writing downloaded Video file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, videoBuffer);
    const videoData = {
      id : 111,
      link : `./${videoName}-${index}.mp4`,
      name:"someName"
    }
    if(!savedFilesPath.videoFiles[userName]){
        savedFilesPath.videoFiles[userName] = [];
    }
    savedFilesPath.videoFiles[userName].push(videoData);
}

function randomNameGenerator() {
    return Math.random().toString(20).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = {downloadPDF, downloadVideo, getAssets};