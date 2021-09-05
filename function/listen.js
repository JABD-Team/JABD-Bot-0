module.export = function ({ event, api, config, prefix, namebot, admin }) {
        if ( event.logMessageType == "log:subscribe" ){
            if (event.logMessageData.addedParticipants.some(id => id.userFbId == api.getCurrentUserID())) {
                return api.sendMessage(`JABD Connected! Prefix : ${prefix}`, event.threadID, () => {
                    api.changeNickname(`[${prefix}]${namebot}`, event.threadID, api.getCurrentUserID());
                });
            } else if (event.logMessageData.addedParticipants.forEach(id => {
                let logsub = async () => {
                var threadID = event.threadID
                var threadInfo = await api.getThreadInfo(threadID)
                var threadName = threadInfo.name
                var userID = id.userFbId;
                api.getUserInfo([userID], (err, userInfo) => {
                    var userMentions = `${userInfo[userID].name}`;
                if (userID !== api.getCurrentUserID()) {
    
                    api.sendMessage(`Chào mừng ${userMentions} vào nhóm ${threadName}`, event.threadID);
                }
          })
        }
        logsub ()
        }) 
        );
    } else if ( event.logMessageType == "log:unsubscribe" ) {
        {
            let logunsub = async () => {
                var threadID = event.threadID
                var threadInfo = await api.getThreadInfo(threadID)
                var threadName = threadInfo.name
            var userID = event.logMessageData.leftParticipantFbId;
            api.getUserInfo([userID], (err, userInfo) => {
                var userMentions = `${userInfo[userID].name}`;
                if (userID !== api.getCurrentUserID()) {
                    api.sendMessage(`Tạm biệt ${userMentions} đã rời khỏi ${threadName}`, event.threadID);
                }
            })
        }
        logunsub ()
        }
    }
}