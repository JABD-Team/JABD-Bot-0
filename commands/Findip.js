function config(){
    return{
        "name": "Findip",
        "main": "Findip.js",
        "commandMap": {
            "findip": {
                "more": "",
                "des": "Lấy ip user",
                "func": "findip"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function findip(event, api){
    var axios = require("axios");
    try {
    var { data } = await axios.get('http://www.geoplugin.net/json.gp')
    var ip = data.geoplugin_request
    api.sendMessage(ip ,event.threadID, event.messageID);
    } catch(err) {
        api.sendMessage(err ,event.threadID, event.messageID);
    }
    }

module.exports = {
    findip,
    config
};