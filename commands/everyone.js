function config(){
    return{
        "name": "all",
        "main": "all.js",
        "commandMap": {
            "all": {
                "more": "",
                "des": "all",
                "func": "all"
            },
            "everyone": {
                "more": "",
                "des": "everyone",
                "func": "everyone"
            }
        },
        "nodeDepends":{
        },
        "noPrefix": "allnopre",
        "author": "JustGon",
        "version": "0.0.1"
    }
}
function all( event , api) {
    return api.getThreadInfo(event.threadID, (err, info) => {
        if (err) return api.sendMessage('error', event.threadID, event.messageID);
        var ids = info.participantIDs;
        ids.splice(ids.indexOf(api.getCurrentUserID()), 1);
        var body = '@', mentions = [];
        for (let i = 0; i < ids.length; i++) {
            if (i == body.length) body += '@';
            mentions.push({
                tag: body[i],
                id: ids[i],
                fromIndex: i
            });
        }
        api.sendMessage({ body, mentions }, event.threadID, event.messageID);
    });
}
function everyone( event , api) {
    return api.getThreadInfo(event.threadID, (err, info) => {
        if (err) return api.sendMessage('error', event.threadID, event.messageID);
        var ids = info.participantIDs;
        ids.splice(ids.indexOf(api.getCurrentUserID()), 1);
        var body = '@', mentions = [];
        for (let i = 0; i < ids.length; i++) {
            if (i == body.length) body += '@';
            mentions.push({
                tag: body[i],
                id: ids[i],
                fromIndex: i
            });
        }
        api.sendMessage({ body, mentions }, event.threadID, event.messageID);
    });
    }
function allnopre( event , api) {
if(event.body == "@everyone" || event.body == "@all") {
return api.getThreadInfo(event.threadID, (err, info) => {
    if (err) return api.sendMessage('error', event.threadID, event.messageID);
    var ids = info.participantIDs;
    ids.splice(ids.indexOf(api.getCurrentUserID()), 1);
    var body = '@', mentions = [];
    for (let i = 0; i < ids.length; i++) {
        if (i == body.length) body += '@';
        mentions.push({
            tag: body[i],
            id: ids[i],
            fromIndex: i
        });
    }
    api.sendMessage({ body, mentions }, event.threadID, event.messageID);
});
}
}
module.exports = {
    all,
    allnopre,
    everyone,
    config
};