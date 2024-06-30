let s = "2024-06-08T10:14:59.000Z";

// 如何解决node.js与mysql数据库时间相差8小时的问题
const moment  =require("moment-timezone");

function getCurrentDateTime(datetime) {
    moment.tz.setDefault("Asia/Shanghai");
    let time=moment(datetime).tz("Asia/Shanghai").format()
    const currentDate = new Date(time);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

console.log("标准时间：",getCurrentDateTime(s))
function compareDateTime(starttime_,endtime_){
    let starttime=getCurrentDateTime(starttime_);
    let endtime=getCurrentDateTime(endtime_);
    let nowtime=getCurrentDateTime(new Date());
    console.log(starttime,endtime,nowtime)
    if(nowtime<starttime){
        return -1;
    }else if(nowtime>=starttime&&nowtime<=endtime){
        return 0;
    }else{
        return 1;
    }
}

console.log(compareDateTime("2024-06-14 18:51:20","2024-06-15 18:51:20"))