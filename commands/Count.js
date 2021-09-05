function config(){
    return{
        "name": "Count",
        "main": "Count.js",
        "commandMap": {
            "count": {
                "more": "",
                "des": "",
                "func": "count"
            }
        },
        "nodeDepends":{
            "os" : ""
        },
        "author": "JustGon",
        "version": "0.0.1"
    }
}


async function count(event, api){
var mention = Object.keys(event.mentions);
    const data = await api.getThreadInfo(event.threadID);
    if (args[0] == "all") {
        let number = 0, msg = "", storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await global.data(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
        });
        for (const lastData of exp) {
            number++;
            msg += `${number}. ${lastData.name} với ${lastData.exp} tin nhắn \n`;
        }
        return api.sendMessage(msg, event.threadID);
    }
    else if (mention[0]) {
        let storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});

        for (const user of storage) {
            const countMess = await global.data(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            if (a.id > b.id) return 1;
		    if (a.id < b.id) return -1;
        });
        console.log(JSON.stringify(exp, null, 4))
        let rank = exp.findIndex(info => parseInt(info.uid) == parseInt(mention[0])) + 1;
        let infoUser = exp[rank - 1];
        return api.sendMessage(`${infoUser.name} đứng hạng ${rank} với ${infoUser.exp} tin nhắn`, event.threadID);
    }
    else {
        let storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await global.data(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            if (a.id > b.id) return 1;
		    if (a.id < b.id) return -1;
        });
        let rank = exp.findIndex(info => parseInt(info.uid) == parseInt(event.senderID)) + 1;
        let infoUser = exp[rank - 1];
        return api.sendMessage(`Bạn đứng hạng ${rank} với ${infoUser.exp} tin nhắn`, event.threadID);
    }
}
module.exports = {
    count,
    config
};