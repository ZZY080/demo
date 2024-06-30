// Object.keys() 
let a = {name:"kenny",age:12,sex:"男"};
console.log(Object.keys(a)); // [ 'name', 'age', 'sex' ]
console.log(Object.values(a)); // [ 'kenny', 12, '男' ]
Object.keys(a).map((key)=>{
    console.log(key,a[key]);
})

// 问题：为什么Object.keys的返回值会自动排序？
// Object.keys在内部会根据属性名key的类型进行不同的排序逻辑。分三种情况：
// 1、如果属性名的类型是Number，那么Object.keys返回值是按照key从小到大排序
// 2、如果属性名的类型是String，那么Object.keys返回值是按照属性被创建的时间升序排序。
// 3、如果属性名的类型是Symbol，那么Object.keys返回值是按照属性被创建的时间升序排序。


// 二、传入字符串，返回索引
var str = 'ab1234';
console.log(Object.keys(str));  //[0,1,2,3,4,5]

// 三、传入数组，返回索引
var arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // ["0", "1", "2"]

