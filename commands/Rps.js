function config(){
    return{
        "name": "Rps",
        "main": "Rps.js",
        "commandMap": {
            "rps": {
                "more": "[✌️,👊,✋]",
                "des": "Game búa, bao, kéo",
                "func": "rps"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}


function rps(event, api){
    function outMsg(data) {
        api.sendMessage(data,event.threadID, event.messageID);
       }
    var arg = event.body.slice(global.config.prefix.length).trim().split(/ +/);

    if (!arg[1]) {
        return outMsg("Vui lòng nhập ✌️ hoặc 👊 hoặc ✋")
      }
      var turnbot = ["✌️","👊","✋"]
      var botturn = turnbot[Math.floor(Math.random() * turnbot.length)] 
      var userturn = arg.slice(1).join(" ")
      if (userturn == "✌️"||userturn == "👊"||userturn == "✋") {
        if (userturn == turnbot) {
          return outMsg(`Hòa\nUser : ${userturn}\nBot : ${botturn} `)
        } else if (userturn == "✌️") {
          if (botturn == "👊") {
            return outMsg(`Bot win\nUser : ${userturn}\nBot : ${botturn} `)
          } else if (botturn == "✋") {
            return outMsg(`User win\nUser : ${userturn}\nBot : ${botturn} `)
        }
      } else if (userturn == "👊") {
        if (botturn == "✋") {
          return outMsg(`Bot win\nUser : ${userturn}\nBot : ${botturn} `)
        } else if (botturn == "✌️") {
          return outMsg(`User win\nUser : ${userturn}\nBot : ${botturn} `)
      }
    } else if (userturn == "✋") {
      if (botturn == "✌️") {
        return outMsg(`Bot win\nUser : ${userturn}\nBot : ${botturn} `)
      } else if (botturn == "👊") {
        return outMsg(`User win\nUser : ${userturn}\nBot : ${botturn} `)
    }
  }
    } else {
      return outMsg("Sai Format")
    }
}

module.exports = {
    rps,
    config
};