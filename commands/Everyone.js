function config(){
    return{
        "name": "Everyone",
        "main": "Everyone.js",
        "commandMap": {
            "everyone": {
                "more": "",
                "des": "tag all thành viên",
                "func": "everyone"
            }
        },
        "nodeDepends":{},
        "author": "JustGon",
        "version": "0.0.1"
    }
}
function everyone(event, api){
            api.getThreadInfo(event.threadID, (err, info) => {
            if (err) return api.sendMessage(('error'), event.threadID, event.messageID);
            var ids = info.participantIDs;
            ids.splice(ids.indexOf(api.getCurrentUserID()), 1);
            var body = '', mentions = [];
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
module.exports = {
    everyone,
    config
};