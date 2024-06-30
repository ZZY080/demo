// 正则表达式 字面量
let reg1 = /\bis\b/;
let text1 = "He is a boy this is a dog where is she ?";
let result1 = text1.replace(reg1,"IS");
console.log(result1);

console.log("--------------------------------------")

let reg2 = /\bis\b/gi;
let text2 = "He is a boy this IS a dog where is she ?";
let result2 = text1.replace(reg2,"IC");
console.log(result2);

let reg3 = /\d{4}[/-]\d{2}[/-]\d{2}/g;
var text3 = '2018-02-23,2018/02/24,2018~02/25';
var result3 = text3.replace(reg3,'匹配正确日期格式');
console.log(result3);//匹配正确日期格式，匹配正确日期格式，2018~02/25


let a = [1,2,3,4];
let b =[1,2,3];
console.log(a.concat(b));


