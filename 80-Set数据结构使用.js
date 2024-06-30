const a = new Set(["a",2,3,4]);
a.add(3);
console.log(a);
console.log(a.size);
console.log(a.has(1));
// a.delete(1);
// console.log(a);
// a.clear();
console.log(a);
a.forEach((value,key,origin)=>{
    console.log(value,key,origin);
})



// 数组去重
let b = [1,2,3,4,1,2,3,"a","a"];
let b_2 =Array.from(new Set(b));

console.log(b_2);
let b_3=[...new Set(b)];
console.log(b_3);

// 对象去重
// let c = [{a:1},{a:1}];
let c = [{a:1},{a:1}];
let c_set = Array.from(new Set(c));
console.log(c_set);