function config(){
    return{
        "name": "Gỡ",
        "main": "Gỡ.js",
        "commandMap": {
            "gỡ": {
                "more": "",
                "des": "Gỡ tin nhắn của bot",
                "func": "gỡ"
            }
        },
        "nodeDepends":{
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function gỡ(event, api){
    if (event.type == "message_reply") {
        if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage('Không thể gỡ tin nhắn người khác!', event.threadID, event.messageID);
          return api.unsendMessage(event.messageReply.messageID);
        }
        else if (event.type != "message_reply") return api.sendMessage('Reply tin nhắn cần gỡ', event.threadID, event.messageID);
    }

module.exports = {
    gỡ,
    config
};