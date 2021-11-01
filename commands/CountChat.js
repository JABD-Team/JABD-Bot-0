function config(){
    return{
        "name": "Countchat '-'))",
        "main": "CountChat.js",
        "commandMap": {
            "count": {
                "more": "[ @mention || all ]",
                "des": "nigga",
                "func": "countchat"
            }
        },
        "nodeDepends":{},
        "noPrefix": "check",
        "author": "Pantsu_Lord",
        "version": "0.0.1"
    }
}

async function countchat (event, api){
	var args = event.body.split(" ").splice(1,1);
	!global.data.countchat ?  global.data.countchat = {} : "";
	!global.data.countchat[event.threadID] ? global.data.countchat[event.threadID] = {} : "";
	!global.data.countchat[event.threadID][event.senderID] ? global.data.countchat[event.threadID][event.senderID] = 0 : "";
	
	var IDs = [];
    for (var y in event.mentions) {
        IDs.push(y);    
	}
	if (IDs.length != 0){
		var user = await api.getUserInfo(IDs)
		var userName = user[IDs].name
		api.sendMessage(`Tổng số tin nhắn của ${userName} trong nhóm là : ${!global.data.countchat[event.threadID][IDs[0]] ? "0" : global.data.countchat[event.threadID][IDs[0]]}`, event.threadID, event.messageID);
	}
	else if (args == ""){
		api.sendMessage(`Tổng số tin nhắn của bạn trong nhóm là : ${global.data.countchat[event.threadID][event.senderID]}`, event.threadID, event.messageID);
	}
	else if (args == "all"){
	var speech = ``;
	for(i=1;i<Object.keys(global.data.countchat[event.threadID]).length+1;i++){
		var user = await api.getUserInfo(Object.keys(global.data.countchat[event.threadID])[i-1])
		var userName = await user[Object.keys(global.data.countchat[event.threadID])[i-1]].name
			speech += `${i}. ${userName}: ${Object.values(global.data.countchat[event.threadID])[i-1]} tin nhắn\r\n`;
	}
		api.sendMessage(speech, event.threadID, event.messageID);
	}
}
function check (event, api){
	if(event.type == "message" || event.type == "message_reply"){
		!global.data.countchat ?  global.data.countchat = {} : "";
		!global.data.countchat[event.threadID] ? global.data.countchat[event.threadID] = {} : "";
		!global.data.countchat[event.threadID][event.senderID] ? global.data.countchat[event.threadID][event.senderID] = 0 : "";
		global.data.countchat[event.threadID][event.senderID]++;
	}
}

module.exports = {
    check,
	countchat,
    config
};