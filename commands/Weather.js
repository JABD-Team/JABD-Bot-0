function config(){
    return{
        "name": "Weather",
        "main": "Weather.js",
        "commandMap": {
            "weather": {
                "more": "",
                "des": "Xem thời tiết",
                "func": "weather"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}
async function weather(event, api){
    var arg = event.body.slice(global.config.prefix.length).trim().split(/ +/);
    var axios = require("axios")
    if (!arg[1]) return api.sendMessage('Vui lòng nhập Location!', event.threadID, event.messageID);
        var dataweather = arg.slice(1).join(" ");
        try {
        var data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${dataweather}&units=metric&appid=c3f985796a573f3d8f491817e7b03a63&lang=vi`);
        var location = data.name,
            temperature = data.main.temp,
            humidity = data.main.humidity,
            feel = data.main.feels_like,
            sky = data.weather[0].description,
            windspeed = data.wind.speed,
            windgust = data.wind.gust
        return api.sendMessage(`----Thời Tiết----\n` +
                      `Địa Điểm : ${location}\n` +
                      `Nhiệt độ ngoài trời : ${temperature}°C\n` +
                      `Nhiệt độ cảm nhận được : ${feel}°C\n` +
                      `Độ ẩm không khí : ${humidity}%\n` +
                      `Bầu trời : ${sky}\n` +
                      `Tốc độ gió : ${windspeed}m/s\n` +
                      `Gió Giật : ${windgust}m/s`, event.threadID, event.messageID)
        } catch {
          return api.sendMessage("Đã có lỗi xảy ra!", event.threadID, event.messageID)
        }
        }
module.exports = {
    weather,
    config
}