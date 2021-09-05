function config(){
    return{
        "name": "Ping",
        "main": "Example.js",
        "commandMap": {
            "ping": {
                "more": "",
                "des": "",
                "func": ""
            }
        },
        "nodeDepends":{},
        "noPrefix": "pongch",
        "author": "HerokeyVN",
        "version": "0.0.1"
    }
}


function pongch(event, api){
    if(event.body == "ping" || event.body == "Ping"){
        api.sendMessage("Pong" , event.threadID, event.messageID);
    }
}

module.exports = {
    pongch,
    config
};