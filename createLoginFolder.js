const fs = require("fs");
const log = require("./function/log.js");
function getLoginFolder(){
    if(fs.existsSync("./loginfile")) {
        console.log('Đã Tìm Thấy Thư Mục Login');
    } else {
        try {
            fs.mkdirSync("./loginfile");
            console.log('Tạo Thư Mục Login Thành Công!');
        } catch (err) {
            console.error(err);
            console.error("Không thể tạo thư mục Login! Tiến hành dừng bot để tránh lỗi không mong muốn...");
            process.exit(100);
        }
    }
}

module.exports = getLoginFolder