//function code by HerokeyVN

const fs = require('fs');
const path = require("path");

function scanDir(type, link){
    //readDir
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

module.exports = scanDir;