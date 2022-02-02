function config() {
    return{
        "name": "t",
        "main": "t.js",
        "commandMap": {
            "t": {
                "more": "",
                "des": "t",
                "func": "t"
            }
        },
        "langMap" : {
            "t": {
                "en_US": {
                    "text": "english"
                },
                "vi_VN": {
                    "text": "tiếng việt"
                }
            }
        },
        "nodeDepends":{
            "axios": ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}

async function t(event, api) {
    api.sendMessage(global.langm[global.config.lang].text, event.threadID);
}
