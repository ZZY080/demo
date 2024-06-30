$(function () {
    // 创建 QRCode 实例
    const qrcodeContainer = document.getElementById("qrcode");
    const qrcode = new QRCode(qrcodeContainer, {
        width: 200,
        height: 200
    });
    let qrDataWithExpiration=null;
    // 生成随机字符串函数
    function generateRandomString() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const length = 10;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }
    // 生成带有效期的二维码
    function generateQRCode() {
        // 生成一个随机的字符串作为二维码内容
        const qrContent = generateRandomString();

        // 计算有效期（例如：一小时后）
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + 20);
       

        // 将有效期信息添加到二维码内容中
        qrDataWithExpiration = {
            content: qrContent,
            expiration: expirationDate.toISOString() // 将日期转换为字符串格式
        };

        // 清除旧二维码并生成新二维码
        qrcode.clear();
        qrcode.makeCode(JSON.stringify(qrDataWithExpiration)); // 将对象转换为 JSON 字符串
    }


    // 解析二维码内容
    function parseQRCodeData(qrCodeData) {
        try {
            const parsedData = JSON.parse(qrCodeData);

            if (parsedData.expiration) {
                const expirationDate = new Date(parsedData.expiration);
                const currentDate = new Date();

                if (currentDate <= expirationDate) {
                    return parsedData.content;
                } else {
                    return "二维码已过期";
                }
            } else {
                return "无效的二维码格式";
            }
        } catch (error) {
            return "无效的二维码格式";
        }
    }
    // 初始化二维码
    generateQRCode();

    // 更新按钮点击事件
    let qrcode_timer = null;
    $(".qrcode-container").on("click","#qrcode",function(){
        if(qrcode_timer){
            return;
        }
        qrcode_timer = setTimeout(()=>{
            generateQRCode();
            clearTimeout(qrcode_timer)
            qrcode_timer = null;
        },3000)
       
    })

    // 当二维码过期时点击刷新图标
    $(".qrcode-container .icon").on("click",function(){
        generateQRCode();
        $(".qrcode-container .mask").removeClass("expires");
    })
    function standardTime(times){
        let year = times.getFullYear();
        let month = times.getMonth()+1;
        month= month<10?"0"+month:month;
        let day = times.getDate();
        day= day<10?"0"+day:day;
        let hour = times.getHours();
        hour=hour<10?"0"+hour:hour;
        let minute= times.getMinutes();
        minute=minute<10?"0"+minute:minute;
        let second = times.getSeconds();
        second=second<10?"0"+second:second;

        return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
    }
    setInterval(()=>{
        let current = new Date();
        let expires =new Date( qrDataWithExpiration.expiration);
        let current_str=standardTime(current)
        let expires_str = standardTime(expires);     
        if(current_str==expires_str){
            $(".qrcode-container .mask").addClass("expires");
        }
    },1000)
})