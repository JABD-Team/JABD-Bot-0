function config(){
    return{
        "name": "Uid",
        "main": "Uid.js",
        "commandMap": {
            "uid": {
                "more": "[@tag]",
                "des": "Lấy UID User",
                "func": "uid"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}
function uid(event, api){
        const mention = Object.keys(event.mentions)[0];
			if (!mention) return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
			else if (mention[0]) {
				for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`${Object.keys(event.mentions)[i]}`, event.threadID, event.messageID);
				return;
			}
        }
module.exports = {
    uid,
    config
}