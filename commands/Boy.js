function config(){
    return{
        "name": "Boy",
        "main": "Boy.js",
        "commandMap": {
            "boy": {
                "more": "",
                "des": "Request ảnh trai",
                "func": "boy"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function boy(event, api){
    var axios = require("axios");
    try {
    var boy = {
        body: "boy",
        attachment: (await axios({
            url: (await axios('https://api.vangbanlanhat.tk/image?type=boy')).data.data,
            method: "GET", 
            responseType: "stream"
        })).data
        
    }
    api.sendMessage(boy ,event.threadID, event.messageID);
    } catch(err) {
        api.sendMessage(err ,event.threadID, event.messageID);
    }
    }

module.exports = {
    boy,
    config
};