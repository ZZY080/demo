import os from "os";
export function getIpAddress() {
    var ipv4 = '';
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details, alias) {
            if (dev === 'WLAN' || dev === '以太网') { //判断需要获取IP的适配器
                if (details.family == 'IPv4') { //判断是IPV4还是IPV6 还可以通过alias去判断
                    ipv4 = details.address;//取addressIP地址
                    return;
                }
            }
        });
    }
    return ipv4 || "127.0.0.1";

}

export function getCurrentDate(){
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    month = month>9?month:"0"+month;
    day = day>9?day:"0"+day;
    hour=hour>9?hour:"0"+hour;
    minute = minute>9?minute:"0"+minute;
    second=second>9?second:"0"+second;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}