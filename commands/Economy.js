function config(){
    return{
        "name": "Economy",
        "main": "Economy.js",
        "commandMap": {
            "work" : {
                "more": "",
                "des": "",
                "func": "work"
            },
            "totalcoin" : {
                "more": "",
                "des": "",
                "func": "totalcoin"
            },
            "cointop" : {
                "more": "",
                "des": "",
                "func": "cointop"
            }
        },
        "nodeDepends":{
        },
        "noPrefix": "economy",
        "author": "C3C-Bot",
        "version": "0.0.1"
    }
}
async function work (event, api) {
    var time = new Date();
    if (global.data.jacoin[event.threadID][event.senderID].workcountdown > time.getTime()) {
        api.sendMessage(`You have to wait ${((global.data.jacoin[event.threadID][event.senderID].workcountdown - time.getTime()) / 1000)} seconds`, event.threadID, event.messageID);
    } else {
        var workgetmoney = Math.floor(Math.random() * (global.data.economy.work.max - global.data.economy.work.min + 1)) + global.data.economy.work.min;;
        global.data.jacoin[event.threadID][event.senderID].totalcoin += workgetmoney;
        api.sendMessage(`You have worked and got ${workgetmoney} JACoin`, event.threadID ,event.messageID);
        global.data.jacoin[event.threadID][event.senderID].workcountdown = ((global.data.economy.countdown * 10000 + time.getTime()));
    }
}
async function totalcoin (event,api) {
    api.sendMessage(`You have ${global.data.jacoin[event.threadID][event.senderID].totalcoin} JACoin`, event.threadID, event.messageID);
}
async function cointop (event,api) { 
    var cmNumber = 10;
    var args = event.body.split(" ");
    args.splice(0,1);
    args = args.join(" ");
    var msg = args ? args : 1;
    msg = Math.trunc(Number(msg));
    var from = (msg * cmNumber)-cmNumber;
    var to = msg * cmNumber;
        var sort = Object.keys(global.data.jacoin[event.threadID]).sort((a, b) => {
            return global.data.jacoin[event.threadID][b].totalcoin - global.data.jacoin[event.threadID][a].totalcoin
        })
        var out = sort.map(e => ({
            id:e,
            coin:global.data.jacoin[event.threadID][e].totalcoin
        }))
          var sus = ``
          for (var i = from; i < to; i++) {
            if(out[i] != undefined){
            sus += `${i+1}. ${(await api.getUserInfo(out[i].id))[out[i].id].name} : ${out[i].coin} JACOIN\n`
            }
          }
          if (out.length % cmNumber != 0) {
            var crp = Math.trunc(out.length / cmNumber)+1;
        }
        else{
            var crp = out.length / cmNumber
        }
        var p = `(Trang ${msg}/${crp})`
        var rt = `${sus}\n${p}`
        
        api.sendMessage(rt , event.threadID, event.messageID);
}
async function economy (event,api) {
    if(event.type == "message" || event.type == "message_reply"){
        !global.data.jacoin ? global.data.jacoin = {} : " ";
        //coin
        !global.data.jacoin[event.threadID] ? global.data.jacoin[event.threadID] = {} : " ";
        !global.data.jacoin[event.threadID][event.senderID] ? global.data.jacoin[event.threadID][event.senderID] = {}  : "";
        !global.data.jacoin[event.threadID][event.senderID].totalcoin ? global.data.jacoin[event.threadID][event.senderID].totalcoin = 0  : "";
        !global.data.jacoin[event.threadID][event.senderID].workcountdown ? global.data.jacoin[event.threadID][event.senderID].workcountdown = 0  : "";
        //countdown
        !global.data.economy ? global.data.economy = {} : " ";
        !global.data.economy.countdown ? global.data.economy.countdown = 6 : " ";
        !global.data.economy.work ? global.data.economy.work = {} : " ";
        !global.data.economy.work.min ? global.data.economy.work.min = 100 : " ";
        !global.data.economy.work.max ? global.data.economy.work.max = 1000 : " ";
}
}
module.exports = {
    config,
    economy,
    totalcoin,
    work,
    cointop
}