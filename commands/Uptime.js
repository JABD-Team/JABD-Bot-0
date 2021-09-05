function config(){
    return{
        "name": "Uptime",
        "main": "Uptime.js",
        "commandMap": {
            "uptime": {
                "more": "",
                "des": "Xem thời gian bot hoạt động",
                "func": "uptime"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}


function uptime(event, api){
const time = process.uptime(),
		    hours = Math.floor(time / (60 * 60)),
		    minutes = Math.floor((time % (60 * 60)) / 60),
		    seconds = Math.floor(time % 60);

	      return api.sendMessage("", event.threadID, () => api.sendMessage(`Bot run ${hours} giờ ${minutes} phút ${seconds} giây.`, event.threadID, event.messageID));
}
module.exports = {
    uptime,
    config
};