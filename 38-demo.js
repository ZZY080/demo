let a = [10,20,30];
// item 为初始值 number 为 a 的每一项
let res = a.reduce((initValue,item)=>{
    console.log(initValue,item);
    return (initValue+item)
},0);
console.log(res);

let b = [1,2,3];
let c = [4,5,6];
console.log(b.concat(c))
console.log(b.join(",")+","+c.join(","));
console.log(b.push.apply(b,c));
console.log(b)