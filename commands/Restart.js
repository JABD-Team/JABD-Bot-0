function config(){
    return{
        "name": "Restart",
        "main": "Restart.js",
        "commandMap": {
            "restart": {
                "more": "",
                "des": "restart bot",
                "func": "restart"
            }
        },
        "nodeDepends":{
            "child_process": ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function restart(event, api) {
  if(event.senderID == global.config.admin) {
    var child_process = require("child_process");
    api.sendMessage('Restarting...', event.threadID, event.messageID)
        setTimeout(function () {child_process.execSync("npm start" ,  {
          stdio: "inherit"
          })}, 3000)
} else {
    api.sendMessage('You are not admin!', event.threadID, event.messageID);
}
}

module.exports = {
    config,
    restart
}