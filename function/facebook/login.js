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
			api.changeNickname(`[${global.config.prefix}]${global.config.namebot}`, event.threadID, api.getCurrentUserID());
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
    if (!ccm) api.sendMessage(`Sai lệnh. Sử dụng "${global.config.prefix}help" để xem danh sách lệnh` , event.threadID, event.messageID);
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
		setTimeout(function () {
			console.error((' {"error":"Error retrieving userID. This can be caused by a lot of things, including getting blocked by Facebook for logging in from an unknown location. Try logging in with a browser to verify."}'))			
			console.error("Không tìm thấy file login"),
			console.error("Vui lòng sử dụng file login .json của J2Team hoặc C3C..."),
			console.error("Khởi động lại bot...")}, 3000)
			setTimeout(function () {child_process.execSync("npm start" ,  {
				stdio: "inherit"
				})},6000)
	} else {
		for (var i = 0; i < filelogin.length; i++) {
				if (filelogin[i].endsWith(".json")) {
					var file = filelogin[i]
					var json = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "../loginfile", file), 'utf8'));
					if (json.url && json.cookies) {
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
								load(api);
							})
					} else {
						require("npmlog").emitLog = () => {};
						return login({appState: JSON.parse(JSON.stringify(json))}, (err, api) => {
							if(err){
								console.error(JSON.stringify(err))
								console.error('Not logged in');
								fs.unlinkSync(path.join(__dirname, "..", "../loginfile", file))
								return process.exit()
								
							}
							
								load(api);
							
							
						})
					}
				} else {
					setTimeout(function () {
						console.error((' {"error":"Error retrieving userID. This can be caused by a lot of things, including getting blocked by Facebook for logging in from an unknown location. Try logging in with a browser to verify."}'))
						console.error("Không tìm thấy file login"),
						console.error("Vui lòng sử dụng file login .json của J2Team hoặc C3C..."),
						console.error("Khởi động lại bot...")}, 3000)
						setTimeout(function () {child_process.execSync("npm start" ,  {
							stdio: "inherit"
							})}, 6000)
				}
			}
		}
}
module.exports = loginn;
