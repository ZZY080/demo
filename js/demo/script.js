// 创建 QRCode 实例
const qrcodeContainer = document.getElementById("qrcode");
const qrcode = new QRCode(qrcodeContainer, {
  width: 200,
  height: 200
});

// 生成初始二维码
generateQRCode();

// 更新按钮点击事件
document.getElementById("update-button").addEventListener("click", generateQRCode);

// 生成二维码函数
function generateQRCode() {
  // 生成一个随机的字符串作为二维码内容
  const qrContent = generateRandomString();

  // 清除旧二维码并生成新二维码
  qrcode.clear();
  qrcode.makeCode(qrContent);
}

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
