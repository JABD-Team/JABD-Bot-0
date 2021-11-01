function config(){
    return{
        "name": "Mong",
        "main": "Mong.js",
        "commandMap": {
            "mong": {
                "more": "",
                "des": "Request ảnh zu to dit bu",
                "func": "mong"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function mong(event, api){
    var axios = require("axios");
    try {
    var mong = {
        body: "mong",
        attachment: (await axios({
            url: (await axios('https://api.ditlolichapfbi.tk/image?type=mong&apikey=phongdeptraiprovip')).data.data,
            method: "GET", 
            responseType: "stream"
        })).data
        
    }
    api.sendMessage(mong ,event.threadID, event.messageID);
    } catch(err) {
        api.sendMessage(err ,event.threadID, event.messageID);
    }
    }

module.exports = {
    mong,
    config
};