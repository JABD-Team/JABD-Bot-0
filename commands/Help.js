function config(){
    return{
        "name": "Help",
        "main": "Help.js",
        "commandMap": {
            "help": {
                "more": "[số trang]|[lệnh]",
                "des": "Xem danh sách lệnh/chi tiết lệnh",
                "func": "main"
            }
        },
        "nodeDepends":{},
        "author": "HerokeyVN",
        "version": "0.0.1"
    }
}

function main(event, api){
    var args = event.body.split(" ");
    args.splice(0,1);
    args = args.join(" ");
    if(!Number(args) && args.length != 0){
        moreInfo(event, api);
    }
    else{
        help(event, api);
    }
}
function help(event, api){
    var cmNumber = 10;
    var args = event.body.split(" ");
    args.splice(0,1);
    args = args.join(" ");
    var msg = args ? args : 1;
    msg = Math.trunc(Number(msg));
    var listCommand = [];
    var listHelp = "";
    for (var x in global.plugins.command){
        var dt = {
            "command": x,
            "more": global.plugins.command[x].more
        }
        listCommand.push(dt);
    }
    var from = (msg * cmNumber)-cmNumber;
    var to = msg * cmNumber;
    
    
    for (var i = from; i < to; i++) {
        if(listCommand[i] != undefined){
            var cm = `${i+1}. ${global.config.prefix}${listCommand[i].command} ${listCommand[i].more}\n`
            listHelp += cm;
        }
    }
    if (listCommand.length % cmNumber != 0) {
        var crp = Math.trunc(listCommand.length / cmNumber)+1;
    }
    else{
        var crp = listCommand.length / cmNumber
    }
    var p = `(${global.lang.Pagecommand} ${msg}/${crp})`
    var rt = `${global.lang.Listcommand}\n${listHelp}\n${p}`
    
    api.sendMessage(rt , event.threadID, event.messageID);
}

function moreInfo(event, api){
    var args = event.body.split(" ");
    args.splice(0,1);
    args = args.join(" ");
    var rt = global.lang.Wrongcommand;
    if (global.plugins.command[args] != undefined){
        var use = `${global.config.prefix}${args} ${global.plugins.command[args].more}`
        var rt = global.lang.Detailcommand.replace("{0}",use).replace("{1}", global.plugins.command[args].des)
    }
    api.sendMessage(rt , event.threadID, event.messageID);
}


module.exports ={
    main,
    config
}
