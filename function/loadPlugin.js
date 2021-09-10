// Function code by HerokeyVN
const fs = require('fs');
const path = require("path");
const cmd = require('child_process');
const scanDir = require(path.join(__dirname, "scanDir.js"));

function loadPlugin(){
    !global.plugins ? global.plugins = {}:"";
    !global.plugins.command ? global.plugins.command = {}:"";
    !global.noPrefix ? global.noPrefix = {}:"";
    var list = scanDir(".js", path.join(__dirname, "..", "commands"));
    var listFile = [];
    for(var i=0; i<list.length; i++){
        var check = path.join(__dirname, "..", "commands", list[i]);
        if (!fs.lstatSync(check).isDirectory()) {
            listFile.push(list[i]);
        }
    }
    var check = false;
    for(var i=0; i<listFile.length; i++){
        try{
            var pluginInfo = require(path.join(__dirname, "..", "commands", listFile[i])).config();
            var t = installmd(listFile[i], pluginInfo);
            if(t != undefined){
                check = true;
            }
        }
        catch(err){
            //console.error(err);
        }
    }
    for(var i=0; i<listFile.length; i++){
        try{
            var pluginInfo = require(path.join(__dirname, "..", "commands", listFile[i])).config();
            var t = installmd(listFile[i], pluginInfo);
            if(t != undefined){
                check = true;
            }
        }
        catch(err){
            //console.error(err);
        }
    }
    
    for(var i=0; i<listFile.length; i++){
        try{
            var pluginInfo = require(path.join(__dirname, "..", "commands", listFile[i])).config();
            load(listFile[i], pluginInfo);
        }
        catch(err){
            console.error("Không thể load \""+listFile[i]+"\" với lỗi: "+err)
        }
    }
}

function load(file, pluginInfo){
    //try{
        var funcmain = require(path.join(__dirname, "..", "commands", file));
        for(var i in pluginInfo.commandMap){
            !global.plugins.command[i] ? global.plugins.command[i] = {}:"";
            !global.plugins.command[i].help ? global.plugins.command[i].name = pluginInfo.name:"";
            !global.plugins.command[i].help ? global.plugins.command[i].more = pluginInfo.commandMap[i].more:"";
            !global.plugins.command[i].tag ? global.plugins.command[i].des = pluginInfo.commandMap[i].des:"";
            !global.plugins.command[i].main ? global.plugins.command[i].dir = path.join(__dirname, "..", "commands", file):"";
            !global.plugins.command[i].mainFunc ? global.plugins.command[i].func = pluginInfo.commandMap[i].func:"";
        }
            if(typeof pluginInfo.noPrefix == "string"){
                !global.noPrefix[pluginInfo.name] ? global.noPrefix[pluginInfo.name] = {
                    dir: path.join(__dirname, "..", "commands", file),
                    func: pluginInfo.noPrefix
                }:"";
            }
        console.cmdloaded("Đã Load Thành Công Command : "+pluginInfo.name+" "+pluginInfo.version+" bởi "+pluginInfo.author)
    //}
    /*catch(err){
        console.error("Không thể load command \""+file+"\" với lỗi: "+err)
    }*/
}

function installmd(file, pluginInfo){
    if(typeof pluginInfo.nodeDepends == "object"){
        for (var i in pluginInfo.nodeDepends){
            if (!fs.existsSync(path.join(__dirname, "..", "node_modules", i, "package.json"))) {
                
                console.log("Tiến hành cài đặt Module \""+i+"\" cho Command \""+pluginInfo.pluginName+"\":\n");
                if(pluginInfo.nodeDepends[i] != ""){
                    cmd.execSync(`npm install ${i}@${pluginInfo.nodeDepends[i]}`)
                }
                else{
                    cmd.execSync(`npm install ${i}`)
                }
                return true;
            }
        }
    }
}

module.exports = loadPlugin;
