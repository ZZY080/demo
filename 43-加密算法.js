const crypto = require('crypto');

// 密码加盐哈希函数
function hashPassword(password, salt) {
    // 将密码和盐值连接
    const saltedPassword = password + salt;
    // 使用MD5对连接后的字符串进行哈希
    const hashedPassword = crypto.createHash('md5').update(saltedPassword).digest('hex');
    // 使用Base64编码对哈希后的结果进行编码
    const base64Hash = Buffer.from(hashedPassword).toString('base64');
    return base64Hash;
}

// 示例
const password = "mypassword";
const salt = "somesaltvalue";

const hashedPassword = hashPassword(password, salt);
console.log("Hashed password with salt: " + hashedPassword);
