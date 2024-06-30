var age = 10;
var array1 = [1, 2, 3];
var arrayandstr = [1, 2, 3, "123"];
console.log("age:", age);
console.log("array1:", array1);
console.log("arrayandstr:", arrayandstr);
function add(param1, param2) {
    return param1 + param2;
}
var sub = function (param1, param2) {
    return param1 - param2;
};
console.log(add(1, 1));
console.log(sub(2, 1));
