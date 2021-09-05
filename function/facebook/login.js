const fs = require("fs");
const login = require("fca-unofficial");
var date = new Date();

function nonPrefix(event, api){
    for (var name in global.noPrefix){
        try{
            var requireCM = require(global.noPrefix[name].dir);
            var func = global.noPrefix[name].func
            requireCM[func](event, api);
        }
        catch(err){
            console.log(err);
        }
    }
}

function runCM(event, api){
    var cm = event.body.slice(global.config.prefix.length, event.body.length);
    var ms = cm.split(" ");
    var ccm = false;
    if(global.plugins.command[ms[0]] != undefined){
        try{
            var requireCM = require(global.plugins.command[ms[0]].dir);
            var func = global.plugins.command[ms[0]].func
            requireCM[func](event, api);
        }
        catch(err){
            console.log("["+global.plugins.command[ms[0]].namePlugin+"] "+err)
            api.sendMessage(err , event.threadID, event.messageID);
        }
        ccm = true
    }
    if (!ccm) api.sendMessage(`Sai lệnh. Sử dụng "${global.config.prefix}help" để xem danh sách lệnh` , event.threadID, event.messageID);
}

function listen(event, api){
    switch (event.type) {
        case "log:subscribe":
        case "message_reply":
        case "message":
            if(global.config.logEvent == false){
                if(event.attachments.length != 0){
				    console.log(JSON.stringify(event, null, 4));
			    }
			    else{
				    console.logg("\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + `[${event.senderID} đến ${event.threadID}] : ${event.body}`);
			    }
            }
            break;
        case "event": 
            break;
        default: 
            if(global.config.logEvent == true)console.log(JSON.stringify(event, null, 4));
    }
    nonPrefix(event, api);
    if(event.body != undefined && event.body.slice(0,global.config.prefix.length) == global.config.prefix){
        args = event.body.slice(global.config.prefix.length).trim().split(/ +/)
        runCM(event, api);
    }
}

function load(api){
    console.loaded("Bot ID : " + api.getCurrentUserID());
    var files = fs.readdirSync('./commands/');
    console.log(`[DONE COMMAND] Đã Load Thành Công : ${files.length} lệnh!`);
    /*var cmdlist = require("./commands/cache/cmdslist.json");
    cmdlist.forEach(cf => {
        log.cmdloaded(`${cf.name}`);
      })*/
    //console.log(`[DONE COMMAND] Đã Load Thành Công : ${cmdlist.length} lệnh!`);
    console.log("Bot bắt đầu nhận tin nhắn");
    api.listenMqtt((err, event) => {
        if(err) return console.error(err);
        

        api.setOptions({
            forceLogin: true,
            listenEvents: true,
            selfListen: config.seflListen
            });
        listen(event, api);
    })
}

function loginn(){
    require("npmlog").emitLog = () => {};
    return login({appState: JSON.parse(fs.readFileSync('fbstate.json', 'utf8'))}, (err, api) => {
        if(err){
            console.error(err)
            return console.error('Not logged in');
        }
        
			load(api);
		
        
    })
}

module.exports = loginn;