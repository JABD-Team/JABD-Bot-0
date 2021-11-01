function config(){
    return{
        "name": "Rps",
        "main": "Rps.js",
        "commandMap": {
            "rps": {
                "more": "[✌️,👊,✋]",
                "des": "Game búa, bao, kéo",
                "func": "rps"
            }
        },
        "nodeDepends":{
          "axios": ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}


async function rps(event, api){
    var axios = require("axios")
    function outMsg(data) {
        api.sendMessage(data,event.threadID, event.messageID);
       }
    var arg = event.body.slice(global.config.prefix.length).trim().split(/ +/);
    var { data } = await axios(`https://api.ditlolichapfbi.tk/game?type=rps&user=${arg.slice(1).join(" ")}`)
    if (!arg[1]) {
        return outMsg(data.data)
    } else {
      outMsg(`${data.data}\nUser:${data.userturn}\nBot:${data.botturn}`)
    }
}

module.exports = {
    rps,
    config
};