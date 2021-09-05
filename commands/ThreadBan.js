function config(){
    return{
        "name": "ThreadBan",
        "main": "ThreadBan.js",
        "commandMap": {
            "ban": {
                "more": "[ThreadID]",
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
        "author": "JustGon",
        "version": "0.0.1"
    }
}

function ban(event, api){
    if(global.config.admin == event.senderID){
            if(global.data.TB.indexOf(event.threadID) == -1){
                global.data.TB.push(event.threadID);
                api.sendMessage(`Đã thêm nhóm có UID "${event.threadID}" vào danh sách ban (Local)` , event.threadID, event.messageID);
            }
            else {
                global.data.TB.splice(global.data.TB.indexOf(event.threadID), 1);
                api.sendMessage(`Đã xóa nhóm có UID "${event.threadID}" khỏi danh sách ban (Local)` , event.threadID, event.messageID);
            }
    } else {
        api.sendMessage("Không đủ quyền!" , event.threadID, event.messageID);
    }
}

function banlist(event, api){
    var list = "";
    for (var i = 0; i < global.data.TB.length; i++) {
        list += `${i+1}. ${global.data.TB[i]}\n`;
    }
    if (list != "") {
        api.sendMessage("Danh sách UID nhóm bị Ban:\n"+list , event.threadID, event.messageID);
    } else {
        api.sendMessage("Không có nhóm nào bị Ban" , event.threadID, event.messageID);
    }
}

function checkBan(event, api){
    !global.data.TB ? global.data.TB =[]:"";
    if(global.data.TB.indexOf(event.senderID) != -1){
        if(event.body){
            if (event.body.slice(0,global.config.prefix.length) == global.config.prefix) {
                api.sendMessage("Ditmemay nhóm bị ban r dùng đb" , event.threadID, event.messageID);
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