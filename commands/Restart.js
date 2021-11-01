function config(){
    return{
        "name": "Restart",
        "main": "Restart.js",
        "commandMap": {
            "restart": {
                "more": "",
                "des": "restart bot",
                "func": "restart"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}

function restart(event, api){
return global.restart ()
}

module.exports = {
    config,
    restart
}