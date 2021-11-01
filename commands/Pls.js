function config(){
    return{
        "name": "Pls",
        "main": "Pls.js",
        "commandMap": {
            "pls": {
                "more": "[type]",
                "des": "Request ảnh pls",
                "func": "pls"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}
async function pls(event, api){
    var args = event.body.slice(global.config.prefix.length).trim().split(/ +/);
    var axios = require("axios");
          if (!args[1]) {
			  var img = {
				body: "",
				attachment: (await axios({
					url: (await axios(`http://nekos.life/api/v2/img/neko`)).data.url,
					method: "GET", 
					responseType: "stream"
				})).data
				
			}
			api.sendMessage(img ,event.threadID, event.messageID);
		} else {
			var pls = args.slice(1).join(" ")
			try {
				var img = {
					body: "",
					attachment: (await axios({
						url: (await axios(`http://nekos.life/api/v2/img/${pls}`)).data.url,
						method: "GET", 
						responseType: "stream"
					})).data
					
				}
				api.sendMessage(img ,event.threadID, event.messageID);
			} catch {
				api.sendMessage("Cannot Find",event.threadID, event.messageID)
			}
		}
}

module.exports = {
    pls,
    config
};