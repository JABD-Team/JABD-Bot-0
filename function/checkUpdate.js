const version = require("../package.json");
const axios = require("axios");

async function check() {
    try {
        const { data } = await axios.get("https://pastebin.com/raw/AJhF7DyG");
        if (data.version != version.version) {
            console.log("Đã có bản cập nhật mới OwO", "update", 1);
        } else console.log("Bạn đang sử dụng phiên bản mới nhất UwU", "update", 3);
    } catch {
        console.error("Đã có lỗi xảy ra.", "update", 1);
    }
}

module.exports = check;