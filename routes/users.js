var express = require("express");
var router = express.Router();
var fs = require("fs");
const localStorage = require('./storageHanlder');
const utils = require('./utils');
const ignitor = require('./ignitor');
 
/* Save the use request for information */
router.get('/requestInfo', (req, res, next)=> {
  const query = utils.getQueryParams(req);
  if(!query.user){
    res.status(400).send({code: 'ERROR', message: "No user information mentioned."});
  }else {
    setDataRunSample(query);
    res.status(200).send({code: 'SUCCESS', message: "request is taken successfully."});
  }
})

// Manually trigger the data fetch.
router.get('/ignitor', (req, res, next)=> {
  (async () => {
    try {
      await ignitor.ingite();
      res.status(200).send({code: 'SUCCESS', message: "Zips generated successfully."});
    }
    catch(err) {
      console.log("Something went wrong ---> ",err);
    }
  })();
})

/*  Download Files */
router.get("/", function(req, res, next) {
  const query = utils.getQueryParams(req);
  const path = `${global.appRoot}/user_zip/${query.user}-info.zip`;
  if(`${global.appRoot}/user_zip/${query.user}-info.zip`)
  try {
    if (fs.existsSync(path)) {
      res.download(path, null , function(err) {});
    }else {
      res.status(400).send({code: 'ERROR', message: "No files for user exist."});
    }
  } catch(err) {
    console.error(err);
    res.status(400).send({code: 'ERROR', message: "No files for user exist."});
  }
 /*  res.download(res.locals.file, null , function(err) {
    err ? console.log("File download Failed!!") : fs.unlinkSync(`${global.appRoot}/user_data/test.html`);
  }); */
});


setDataRunSample = async (query) => {
    await localStorage.setData("users",query.user);
    let data = await localStorage.getData("users");
}

module.exports = router;
