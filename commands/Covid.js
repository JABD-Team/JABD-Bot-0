function config(){
    return{
        "name": "Covid",
        "main": "Covid.js",
        "commandMap": {
            "covid": {
                "more": "",
                "des": "Xem tình hình dịch covid",
                "func": "covid"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}
async function covid (event, api) {
    var fs = require("fs")
    var request = require("request")
    var axios = require("axios")
    var arg = event.body.slice(global.config.prefix.length).trim().split(/ +/);
    if (!arg[1]) {
      let { data } = await axios.get('https://corona.lmao.ninja/v2/countries/viet%20nam')
    var nhiemvn = data.cases,
        chetvn = data.deaths,
        dieutrivn = data.recovered,
        dansovn = data.population,
        chauluc = data.continent
        var callback = () => api.sendMessage({body: '-----🇻🇳Việt Nam🇻🇳-----\n' + `Nhiễm: ${nhiemvn}\n` + `Đang điều trị: ${dieutrivn}\n` + `Tử vong: ${chetvn}\n` + `Dân số : ${dansovn}\n` + `Châu Lục : ${chauluc}`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);
    request(encodeURI('https://disease.sh/assets/img/flags/vn.png')).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
} else {
try {
    var location = arg.slice(1).join(" ")
    let { data } = await axios.get(`https://corona.lmao.ninja/v2/countries/${location}`)
    var nhiem = data.cases,
        chet = data.deaths,
        dieutri = data.recovered,
        danso = data.population,
        chauluc = data.continent
        var flag = data.countryInfo.flag
        var callback = () => api.sendMessage({body: `-----${location}-----\n` + `Nhiễm: ${nhiem}\n` + `Đang điều trị: ${dieutri}\n` + `Tử vong: ${chet}\n` + `Dân số : ${danso}\n` + `Châu Lục : ${chauluc}`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);
        request(encodeURI(flag)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
} catch {
    api.sendMessage("Country not found or doesn't have any cases", event.threadID, event.messageID)
}
}
}
module.exports = {
    covid,
    config
}