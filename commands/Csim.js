function config(){
    return{
        "name": "Csim",
        "main": "Csim.js",
        "commandMap": {
            "csim": {
                "more": "[text]",
                "des": "csim",
                "func": "csim"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}
async function csim(api, event) {
    !global.data.csim?global.data.csim = {} : " ";
    !global.data.csim[event.threadID]?global.data.csim[event.threadID] = false : " ";
    var arg = event.body.slice(global.config.prefix.length).trim().split(/ +/);
    var axios = require("axios");
    var text = arg.slice(1).join(" ")
    if (text == "on") {
        global.data.csim[event.threadID] = true;
        api.sendMessage("Đã Bật Csim Ở Thread Này" , event.threadID, event.messageID);
    } else if (text == "off") {
        global.data.csim[event.threadID] = false;
        api.sendMessage("Đã Tắt Csim Ở Thread Này" , event.threadID, event.messageID);
    }
    if(event.type == "message" && global.data.csim[event.threadID]) {
        try {
            var { data } = await axios(`https://api.simsimi.net/v2/?text=${text}&lc=vn`)
            api.sendMessage(data.success, event.threadID, event.messageID)
        } catch(error) {
            api.sendMessage(error, event.threadID, event.messageID)
        }
    } else {
        return;
    }
}
module.exports = {
    csim,
    config
}