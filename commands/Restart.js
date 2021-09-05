function config(){
    return{
        "name": "Restart",
        "main": "Restart.js",
        "commandMap": {
            "ban": {
                "more": "",
                "des": "Restart bot",
                "func": "restart"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}
function restart(){
return global.restart = () => {
    setTimeout(function () {
      process.exit(7378278);
    }, 1000);
    return "Restarting...";
  }
}
module.exports = {
    restart,
    config
}