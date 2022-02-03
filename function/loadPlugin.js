//This Bot Made By JustGonDev. Do Not Copy This Bot.
//Copyright © 2022 JustGonDev. All rights reserved.
//Version: 1.0.0
//Author: JustGonDev
//Author URL: https://github.com/JustGonDev

//Require Package
const fs = require('fs');
const path = require("path");
const childProcess = require('child_process');

//Scan Dir
function scanDir(type, link){
    var dirfile = fs.readdirSync(link);
    var arr = [];
    for (var i=0; i<dirfile.length; i++ ){
            if(dirfile[i].lastIndexOf(type) == dirfile[i].length-type.length){
                if(fs.lstatSync(path.join(link, dirfile[i])).isFile()){
                    arr.push(dirfile[i]);
                }
            }
    }
    return arr;
}
//Load Func
function loadfunc(){
    !global.plugins ? global.plugins = {}:"";
    !global.plugins.command ? global.plugins.command = {}:"";
    !global.plugins.lang ? global.plugins.lang = {}:"";
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
            var t = loadpackage(listFile[i], pluginInfo);
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
            var t = loadpackage(listFile[i], pluginInfo);
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
            console.log("Không thể load \""+listFile[i]+"\" với lỗi: "+err)
        }
    }
}

function load(file, pluginInfo){
    //try{
        for(var i in pluginInfo.commandMap){
            !global.plugins.command[i] ? global.plugins.command[i] = {}:"";
            !global.plugins.command[i].help ? global.plugins.command[i].name = pluginInfo.name:"";
            !global.plugins.command[i].help ? global.plugins.command[i].more = pluginInfo.commandMap[i].more:"";
            !global.plugins.command[i].tag ? global.plugins.command[i].des = pluginInfo.commandMap[i].des:"";
            !global.plugins.command[i].author ? global.plugins.command[i].author = pluginInfo.author:"";
            !global.plugins.command[i].main ? global.plugins.command[i].dir = path.join(__dirname, ".", "func", file):"";
            !global.plugins.command[i].mainFunc ? global.plugins.command[i].func = pluginInfo.commandMap[i].func:"";
            
        }
        for(var i in pluginInfo.langMap){
            !global.plugins.lang[i] ? global.plugins.lang[i] = pluginInfo.langMap[i]:"";
        }
            if(typeof pluginInfo.noPrefix == "string"){
                !global.noPrefix[pluginInfo.name] ? global.noPrefix[pluginInfo.name] = {
                    dir: path.join(__dirname, "..", "commands", file),
                    func: pluginInfo.noPrefix
                }:"";
            }
        console.log("Đã Load Thành Công Commands : "+pluginInfo.name+" "+pluginInfo.version+" bởi "+pluginInfo.author)
    //}
    /*catch(err){
        console.error("Không thể load command \""+file+"\" với lỗi: "+err)
    }*/
}

//Load Package For Command
function loadpackage(file, pluginInfo){
    if(typeof pluginInfo.nodeDepends == "object"){
        for (var i in pluginInfo.nodeDepends){
            if (!fs.existsSync(path.join(__dirname, "..", "node_modules", i, "package.json"))) {
                
                console.log("Tiến hành cài đặt Module \""+i+"\" cho commands \""+pluginInfo.name+"\":\n");
                if(pluginInfo.nodeDepends[i] != ""){
                    childProcess.execSync(`npm install ${i}@${pluginInfo.nodeDepends[i]}`,{
                        stdio: "inherit"
                    })
                }
                else{
                    childProcess.execSync(`npm install ${i}`,{
                        stdio: "inherit"
                    })
                }
                return true;
            }
        }
    }
}

//Export
module.exports = loadfunc;
