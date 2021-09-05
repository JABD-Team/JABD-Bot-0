function config(){
    return{
        "name": "Cat",
        "main": "Cat.js",
        "commandMap": {
            "cat": {
                "more": "",
                "des": "Request ảnh mèo",
                "func": "cat"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function cat(event, api){
    var axios = require("axios");
    try {
    var cat = {
        body: "cat",
        attachment: (await axios({
            url: (await axios('https://api.thecatapi.com/v1/images/search')).data[0].url,
            method: "GET", 
            responseType: "stream"
        })).data
        
    }
    api.sendMessage(cat ,event.threadID, event.messageID);
    } catch(err) {
        api.sendMessage(err ,event.threadID, event.messageID);
    }
    }

module.exports = {
    cat,
    config
};