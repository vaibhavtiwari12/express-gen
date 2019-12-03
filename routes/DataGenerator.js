var fsAsync = require("fs").promises;
var fs = require("fs");
var express = require("express");
var router = express.Router();
var templateGen = require("./TemplateGenerator.js");
var mockData = require("./__mock/UserData");
var zipFolder = require('zip-folder');
const { zip } = require('zip-a-folder');
var assetDownloader = require('./AssetDownloaders');
const chalk = require('chalk');
const scanner = require('./TransactionFetcher');

fetchAllData = async  (userName) => {
    
    // Create the new Folders for each user.
    var dir = `${global.appRoot}/user_data/${userName}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    
    //Fetch the information for user.
    const user = mockData[userName];

    // Download all the resources that has to be downloaded.
    const savedFilesPath = await assetDownloader.getAssets(userName, user);
    console.log(chalk.blueBright("Asset Loading Completed for --> ", userName));


    //Read all the files from the given directory.
    const scannedObj = await scanner.getAllFiles(`${global.appRoot}/routes/__mock//userTranscationData/`);
    console.log("SCANNED Files", scannedObj);

    //get all the json data from the files fetched above.
    const dataInObject = await scanner.readAllFiles(scannedObj);
    console.log("Scanned Data", dataInObject);


    // Create a template from the data genrated.
    const template = templateGen(
        user.transactionData,
        user.visitData,
        user.loyaltyAndRewardsData,
        savedFilesPath.pdfFiles[userName],
        savedFilesPath.videoFiles[userName],
    );

    // Write template in to the file and zip the final file.
    await fsAsync.writeFile(`${global.appRoot}/user_data/${userName}/test.html`, template);
    console.log("File write has been successful for user -- ",userName);
    
    await zip(`${global.appRoot}/user_data/${userName}`, `${global.appRoot}/user_zip/${userName}-info.zip`);
    console.log('ZIP generated successfully for -->'  , userName);
}

module.exports = {fetchAllData};
