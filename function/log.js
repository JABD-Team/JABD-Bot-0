var date = new Date()
const chalk = require('chalk');
function log(data) {
    console.logg("\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + "[INTERNAL]" + " " + (data));
}
function err(data) {
    console.logg("\x1b[K" + "\x1B[32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + chalk.red("[ERROR]") + " " + (data));
}
function gban(data) {
    console.logg("\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + "[GLOBAL-BAN]" + " " + (data))
}
function loaded(data) {
    console.logg("\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + "[LOADED]" + " " + (data));
}
function cmdloaded(data) {
    console.logg("\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + "[" + (date.getUTCFullYear()+ "-" + (date.getUTCMonth() + 1)+ "-" + date.getUTCDate()+ "T" + date.getUTCHours()+ "-" + date.getUTCMinutes()+ "-" + date.getUTCSeconds()+ "." + date.getUTCMilliseconds()+ "Z") + "]" + " " + "[LOADING]" + chalk.blue(" [COMMAND]") + " " + "\x1b[K" + "\x1b[1;32m" + "\x1b[1;92m" + "\x1b[38;2;0;255;0m" + (data))
}
module.exports = { log, err, gban, loaded, cmdloaded };
