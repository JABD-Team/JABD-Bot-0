function config(){
    return{
        "name": "Boy",
        "main": "Boy.js",
        "commandMap": {
            "covid": {
                "more": "",
                "des": "Request tình hình dịch covid",
                "func": "covid"
            }
        },
        "nodeDepends":{
            "axios" : "",
            "request" : "",
            "fs" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}
async function covid(event,api) {
    var axios = require("axios");
    var fs = require("fs")
    var request = require("request")
    var arg = event.body.slice(global.config.prefix.length).trim().split(/ +/);
    if (!arg[1]) {
    let { data } = await axios.get('https://disease.sh/v3/covid-19/countries/vietnam')
    var nhiemvn = data.cases,
        chetvn = data.deaths,
        khoibenh = data.recovered,
        xetnhiem = data.tests
        danso = data.population,
        chauluc = data.continent
        flag = data.countryInfo.flag
        api.sendMessage({
            body: '-----🇻🇳Việt Nam🇻🇳-----\n' + `Nhiễm: ${nhiemvn}\n` + `Tử vong: ${chetvn}\n` + `Khỏi bệnh : ${khoibenh}\n` + `Xét nhiệm : ${xetnhiem}\n` + `Dân số : ${danso}\n` + `Châu Lục : ${chauluc}\n`,
            attachment: (await axios({
                url: flag,
                method: "GET", 
                responseType: "stream"
            })).data
        }, event.threadID ,event.messageID);
    } else {
    try {
        var location = arg.slice(1).join(" ")
        let { data } = await axios.get(`https://disease.sh/v3/covid-19/countries/${location}`)
        var nhiemvn = data.cases,
        chetvn = data.deaths,
        khoibenh = data.recovered,
        xetnhiem = data.tests
        danso = data.population,
        chauluc = data.continent
        flag = data.countryInfo.flag
        api.sendMessage({
            body: `-----${data.country}-----\n` + `Nhiễm: ${nhiemvn}\n` + `Tử vong: ${chetvn}\n` + `Khỏi bệnh : ${khoibenh}\n` + `Xét nhiệm : ${xetnhiem}\n` + `Dân số : ${danso}\n` + `Châu Lục : ${chauluc}\n`,
            attachment: (await axios({
                url: flag,
                method: "GET", 
                responseType: "stream"
            })).data
        }, event.threadID ,event.messageID);
    } catch {
    api.sendMessage("Country not found or doesn't have any cases", event.threadID, event.messageID)
    }
    }
}
module.exports = {
    covid,
    config
};