function config(){
    return{
        "name": "UserBan",
        "main": "UserBan.js",
        "commandMap": {
            "ban": {
                "more": "[UserID]",
                "des": " Ban người dùng nào đó tại bot này",
                "func": "ban"
            },
            "banlist": {
                "more": "",
                "des": "Xem danh sách người dùng bị Ban",
                "func": "banlist"
            }
        },
        "nodeDepends":{},
        "noPrefix": "checkBan",
        "author": "HerokeyVN",
        "version": "0.0.1"
    }
}

function ban(event, api){
    var args = event.body.split(" ");
    args.splice(0,1);
    args = args.join(" ");
    if(global.config.admin == event.senderID){
        if(!args){
            if (event.messageReply.senderID) {
                if(global.data.UB.indexOf(event.messageReply.senderID) == -1){
                    global.data.UB.push(event.messageReply.senderID);
                    api.sendMessage(`Đã thêm người dùng có UID "${event.messageReply.senderID}" vào danh sách ban (Local)` , event.threadID, event.messageID);
                } else {
                    global.data.UB.splice(global.data.UB.indexOf(event.messageReply.senderID), 1);
                    api.sendMessage(`Đã xóa người dùng có UID "${event.messageReply.senderID}" khỏi danh sách ban (Local)` , event.threadID, event.messageID);
                }
            } else {
                api.sendMessage("Vui lòng reply tin nhắn hoặc thêm UID người dùng cần Ban/UnBan!" , event.threadID, event.messageID);
            }
        } else {
            if(global.data.UB.indexOf(args) == -1){
                global.data.UB.push(args);
                api.sendMessage(`Đã thêm người dùng có UID "${args}" vào danh sách ban (Local)` , event.threadID, event.messageID);
            }
            else {
                global.data.UB.splice(global.data.UB.indexOf(args), 1);
                api.sendMessage(`Đã xóa người dùng có UID "${args}" khỏi danh sách ban (Local)` , event.threadID, event.messageID);
            }
        }
    } else {
        api.sendMessage("Không đủ quyền!" , event.threadID, event.messageID);
    }
}

function banlist(event, api){
    var list = "";
    for (var i = 0; i < global.data.UB.length; i++) {
        list += `${i+1}. ${global.data.UB[i]}\n`;
    }
    if (list != "") {
        api.sendMessage("Danh sách UID người dùng bị Ban:\n"+list , event.threadID, event.messageID);
    } else {
        api.sendMessage("Không có ai bị Ban" , event.threadID, event.messageID);
    }
}

function checkBan(event, api){
    !global.data.UB ? global.data.UB =[]:"";
    if(global.data.UB.indexOf(event.senderID) != -1){
        if(event.body){
            if (event.body.slice(0,global.config.prefix.length) == global.config.prefix) {
                api.sendMessage("Ditmemay bị ban r dùng đb" , event.threadID, event.messageID);
            }
            event.body = "";
        }
    }
}

module.exports = {
    ban,
    banlist,
    checkBan,
    config
};