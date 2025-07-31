// 通用国际号码验证（E.164标准）
function validateInternationalPhone(phone) {
  return /^\+[1-9]\d{1,14}$/.test(phone);
}
// 中国大陆手机号验证
function validateCNPhone(phone) {
  return /^(?:\+?86)?1[3-9]\d{9}$/.test(phone);
}
const phone = "193768119091wewq";
console.log(validateInternationalPhone(phone));
