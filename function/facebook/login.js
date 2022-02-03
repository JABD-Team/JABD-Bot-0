const fs = require("fs");
const login = require("fca-unofficial-force");
const request = require("sync-request");
const axios = require("axios")
const path = require("path");
var child_process = require("child_process");
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

function inout(event,api) {
if ( event.logMessageType == "log:subscribe" ){
	if (event.logMessageData.addedParticipants.some(id => id.userFbId == api.getCurrentUserID())) {
		return api.sendMessage(`JABD Connected! Prefix : ${global.config.prefix}`, event.threadID, () => {
			api.changeNickname(`[${global.config.prefix}]${global.config.botname}`, event.threadID, api.getCurrentUserID());
		});
	} else if (event.logMessageData.addedParticipants.forEach(id => {
		let logsub = async () => {
		var threadID = event.threadID
		var threadInfo = await api.getThreadInfo(threadID)
		var threadName = threadInfo.name
		var userID = id.userFbId;
		api.getUserInfo([userID], (err, userInfo) => {
			var userMentions = `${userInfo[userID].name}`;
		if (userID !== api.getCurrentUserID()) {

			api.sendMessage(`Chào mừng ${userMentions} vào nhóm ${threadName}`, event.threadID);
		}
  })
}
logsub ()
}) 
);
} else if ( event.logMessageType == "log:unsubscribe" ) {
{
	let logunsub = async () => {
		var threadID = event.threadID
		var threadInfo = await api.getThreadInfo(threadID)
		var threadName = threadInfo.name
	var userID = event.logMessageData.leftParticipantFbId;
	api.getUserInfo([userID], (err, userInfo) => {
		var userMentions = `${userInfo[userID].name}`;
		if (userID !== api.getCurrentUserID()) {
			api.sendMessage(`Tạm biệt ${userMentions} đã rời khỏi ${threadName}`, event.threadID);
		}
	})
}
logunsub ()
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
			global.langm = global.plugins.lang[ms[0]]
            requireCM[func](event, api);
        }
        catch(err){
            console.log("["+global.plugins.command[ms[0]].namePlugin+"] "+err)
            api.sendMessage(err , event.threadID, event.messageID);
        }
        ccm = true
    }
    if (!ccm) api.sendMessage(`${global.lang.ErrHelp.replace("{0}", global.config.prefix)}` , event.threadID, event.messageID);
}
function listen(event, api){
    switch (event.type) {
        case "log:subscribe":
        case "message_reply":
        case "message":
			if(event.attachments.length != 0){
				console.log(JSON.stringify(event, null, 4));
			}
			else{
				console.logg("\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + `[${event.senderID} đến ${event.threadID}] : ${event.body}`);
			}
            break;
        case "event": 
            break;
        default: 
            if(global.config.logEvent == true)console.log(JSON.stringify(event, null, 4));
    }
    nonPrefix(event, api);
	inout(event,api)
	if(event.body != undefined && event.body.slice(0,global.config.prefix.length) == global.config.prefix){
		args = event.body.slice(global.config.prefix.length).trim().split(/ +/);
		runCM(event, api);
	}
}
async function checkupdate() {
	try {
		const { data } = await axios.get("https://raw.githubusercontent.com/JABD-Team/JABD-Bot-0/master/package.json");
		if (data.version != global.package.version) {
			console.log("Đã có bản cập nhật mới OwO");
		} else {
		console.log("Bạn đang sử dụng phiên bản mới nhất UwU");
		}
	} catch(e) {
		console.error("Đã có lỗi xảy ra.");
		console.error(e)
	}
}
checkupdate()
async function load(api){
    console.loaded("Bot ID : " + api.getCurrentUserID());
    var files = fs.readdirSync('./commands/');
    console.log(`[DONE COMMAND] Đã Load Thành Công : ${files.length} lệnh!`);
    console.log("Bot bắt đầu nhận tin nhắn\n");
	console.logg("     /$$$$$  /$$$$$$  /$$$$$$$  /$$$$$$$\n    |__  $$ /$$__  $$| $$__  $$| $$__  $$\n       | $$| $$  \\ $$| $$  \\ $$| $$  \\ $$\n       | $$| $$$$$$$$| $$$$$$$ | $$  | $$\n  /$$  | $$| $$__  $$| $$__  $$| $$  | $$\n | $$  | $$| $$  | $$| $$  \\ $$| $$  | $$\n |  $$$$$$/| $$  | $$| $$$$$$$/| $$$$$$$/\n  \\______/ |__/  |__/|_______/ |_______/\n");
	console.logg("Đừng ByPass! Hãy Tôn Trọng Project Của Bọn Mình...\n\n")
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
function loginn() {
	var filelogin = fs.readdirSync(path.join(__dirname, "..", "../loginfile"))
	if(filelogin.length == 0){
		console.error(('{"error":"Error retrieving userID. This can be caused by a lot of things, including getting blocked by Facebook for logging in from an unknown location. Try logging in with a browser to verify."}'))			
		console.error("Login file not found"),
		console.error("Please use J2Team or C3C login .json file..."),
		console.error("Shutting down bot...")
		process.exit()
	} else {
		for (var i = 0; i < filelogin.length; i++) {
				if (filelogin[i].endsWith(".json")) {
					var file = filelogin[i]
					var json = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "../loginfile", file), 'utf8'));
					if (json.url && json.cookies) {
						console.log("Found J2TEAM Login File...")
						let appstate = [];
						for ( const i of json.cookies) {
							appstate.push({
								key: i.name,
								value: i.value,
								expires: i.expirationDate || "",
								domain: i.domain.replace(".", ""),
								path: i.path
							})
						}
						require("npmlog").emitLog = () => {};
						return login({appState: JSON.parse(JSON.stringify(appstate))}, (err, api) => {
							if(err){
								console.error(JSON.stringify(err))
								console.error('Not logged in');
								fs.unlinkSync(path.join(__dirname, "..", "../loginfile", file))
								return process.exit()
							}
                            console.log('[FACEBOOK] Logged in');
							return load(api)
							})
					} else {
						console.log("Found C3C Login File...")
						require("npmlog").emitLog = () => {};
						return login({appState: JSON.parse(JSON.stringify(json))}, (err, api) => {
							if(err){
								console.error(JSON.stringify(err))
								console.error('Not logged in');
								fs.unlinkSync(path.join(__dirname, "..", "../loginfile", file))
								return process.exit()
							}
							console.log('[FACEBOOK] Logged in');
							return load(api)
						})
					}
				} else if (filelogin[i].endsWith(".txt")) {
					var atp = fs.readFileSync(path.join(__dirname, "..", "../loginfile", filelogin[i]), 'utf8');
					console.log("Found ATP Login File...")
					const unofficialAppState = []
					const items = atp.split(";|")[0].split(";")
					if (items.length < 2) {
						console.error(" Not a atp cookie")
						process.exit()
					}
					const validItems = ["sb", "datr", "c_user", "xs"]
					let validCount = 0
					for (const item of items) {
						const key = item.split("=")[0]
						const value = item.split("=")[1]
						if (validItems.includes(key)) validCount++
						unofficialAppState.push({
							key,
							value,
							domain: "facebook.com",
							path: "/"
						})
					}
					if (validCount >= validItems.length) {
						require("npmlog").emitLog = () => {};
						return login({appState: JSON.parse(JSON.stringify(unofficialAppState))}, (err, api) => {
							if(err){
								console.error(JSON.stringify(err))
								console.error('Not logged in');
								fs.unlinkSync(path.join(__dirname, "..", "../loginfile", filelogin[i]))
								return process.exit()
							}
							console.log('[FACEBOOK] Logged in');
							return load(api)
						})
					} else {
						console.error("Not a ATP cookie")
						fs.unlinkSync(path.join(__dirname, "..", "../loginfile", filelogin[i]))
					}
				} else {
					setTimeout(function () {
						console.error((' {"error":"Error retrieving userID. This can be caused by a lot of things, including getting blocked by Facebook for logging in from an unknown location. Try logging in with a browser to verify."}'))
						console.error("Login file not found"),
						console.error("Please use J2Team or C3C login .json file..."),
						console.error("Shutting down bot...")}, 3000)
                        process.exit()
				}
			}
		}
}
module.exports = loginn;

