function config(){
    return{
        "name": "Sysinfo",
        "main": "Sysinfo.js",
        "commandMap": {
            "sysinfo": {
                "more": "",
                "des": "",
                "func": "sysinfo"
            }
        },
        "nodeDepends":{
            "os" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}


function sysinfo(event, api){
    function byte(bytes) {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let l = 0, n = parseInt(bytes, 10) || 0;
        while (n >= 1024 && ++l) n = n / 1024;
        return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}${units[l]}`;
    }
    var os = require("os");
    return api.sendMessage(`${os.EOL}Hệ điều hành : ${os.type()}${os.arch()}\nRam : ${byte(os.totalmem())}\nCPU : ${os.cpus()[0].model}\nSố luồng CPU : ${os.cpus().length}\nDung lượng bộ nhớ : ${byte(os.freemem())}\n`, event.threadID, event.messageID);
}

module.exports = {
    sysinfo,
    config
};