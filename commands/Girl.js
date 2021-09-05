function config(){
    return{
        "name": "Girl",
        "main": "Girl.js",
        "commandMap": {
            "girl": {
                "more": "",
                "des": "Request ảnh gái",
                "func": "girl"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon & HungVu",
        "version": "0.0.1"
    }
}

async function girl(event, api){
    var axios = require("axios");
    try {
    var girl = {
        body: "girl",
        attachment: (await axios({
            url: (await axios('https://api.ditlolichapfbi.tk/image?type=gai')).data.data,
            method: "GET", 
            responseType: "stream"
        })).data
        
    }
        api.sendMessage(girl ,event.threadID, event.messageID);
    } catch(err) {
        api.sendMessage(err ,event.threadID, event.messageID);
}
}

module.exports = {
    girl,
    config
};