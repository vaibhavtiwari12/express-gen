const storage = require('node-persist');

getData = async (key) => {
    let data = await storage.getItem(key);
    return JSON.parse(data);
}
setData = async (key, value)=> {
    // get current data from storage
    let data = await storage.getItem(key); // [{user : another}]
    let prepareData = {user : value}
    !data ? data = [] : data = JSON.parse(data);
    data.push(prepareData);
    let stringData = JSON.stringify(data);
    await storage.updateItem(key, stringData);
    return;
}

module.exports = {getData, setData}; 