const { resolve } = require('path');
const { readdir } = require('fs').promises;
const request = require("request-promise-native"); 
var fsAsync = require("fs").promises;
let mergedFiles = [];

async function getAllFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

readAllFiles = async (fileLinks) => {
    if(fileLinks)  {
        await Promise.all(
            fileLinks.map( async (file,index) =>{
                await readJSONAsync(file);
            })
        );
        return mergedFiles;
    }
}

async function readJSONAsync(fileUri) {
    
    var jsonData = await fsAsync.readFile(fileUri, 'utf8');
    jsonData = JSON.parse(jsonData);
    mergedFiles.push(jsonData.transactions);
}


module.exports = { getAllFiles,readAllFiles };