const fs = require("fs");
const axios = require("axios");
const log = require("./function/log.js")
const createConfig = require("./createConfig.js");
const createData = require("./getdata.js")
const fetch = require("node-fetch");
const path = require("path");


//package
global.package = require("./package.json")


//var cmds = require("./commands/cmds.js")({ config, log, axios });
console.loaded = log.loaded;
console.logg = console.log;
console.log = log.log;
console.error = log.err;
console.gban = log.gban;
console.cmdloaded = log.cmdloaded;
//starting bot
console.log("Starting JABD Bot Version " + package.version +"...")
//load config
global.config = createConfig();

//load data
global.data = createData();

//load lang
global.lang = require("./lang/" + global.config.lang + ".json")

setInterval(function(){
    try{
        fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(global.data, null, 4)); 
    } catch (err){
        console.error("Không thể đồng bộ hóa Data với lỗi: "+err);
    }
}, 5*1000);

//loginfolder
const loginfolder = require('./createLoginFolder')
loginfolder()
//load plugins
require("./function/loadPlugin.js")();


//function login to facebook
const loginFB = require("./function/facebook/login.js");
const modules = {
    loginwithappstate: loginFB,
    loadData: function () {
        if (data.hasOwnProperty('threads')) {
            for (const thread of data.threads) {
                if (threadData.hasOwnProperty(thread.threadID)) {
                    threadData[thread.threadID] = thread;
                }
            }
        }
        if (data.hasOwnProperty('users')) {
            for (const user of data.users) {
                if (userData.hasOwnProperty(user.userID)) {
                    userData[user.userID] = user;
                }
            }
        }
    },
    getData: function ({ event }) {
        var thread = data.threads.find(e => e.threadID == event.threadID);
        var user = data.users.find(e => e.userID == event.senderID);
        return {
            thread,
            user
        }
    }
}
return modules.loginwithappstate();
