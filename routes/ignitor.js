const storage = require('./storageHanlder');
const datagenerator = require("./DataGenerator");
const rimraf = require("rimraf");
const chalk = require('chalk');
 

ingite = async () => {
  
    let users = await storage.getData('users');
    let result = await Promise.all(
        users.map( async user =>{
            console.log(chalk.yellow("Starting Parallel Execution for ---> ", user.user));
            await datagenerator.fetchAllData(user.user);
        })
    );
    if(result) {
        console.log(chalk.bgWhiteBright.blackBright.bold("Batch Processing for all the users is completed."));
        rimraf(`${global.appRoot}/user_data/`, function () { 
            console.log(chalk.redBright("Deleted the user_data files for users."));
        });
        return;
    }
}
module.exports = {ingite};