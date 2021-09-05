function config(){
    return{
        "name": "Dog",
        "main": "Dog.js",
        "commandMap": {
            "dog": {
                "more": "",
                "des": "Request ảnh chó",
                "func": "dog"
            }
        },
        "nodeDepends":{
            "axios" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function dog(event, api){
    var axios = require("axios");
    try {
    var dog = {
        body: "dog",
        attachment: (await axios({
            url: (await axios('https://random.dog/woof.json')).data.url,
            method: "GET", 
            responseType: "stream"
        })).data
        
    }
    api.sendMessage(dog ,event.threadID, event.messageID);
    } catch(err) {
        api.sendMessage(err ,event.threadID, event.messageID);
    }
    }

module.exports = {
    dog,
    config
};