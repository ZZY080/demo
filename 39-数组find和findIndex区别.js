// es6数组方法find()、findIndex()与filter()的总结  item 为数组元素 index 为数组索引 arr 为当前数组
let arr = [1,2,3,4,5,6]
// find() 主要返回 找到第一个元素的值
let value=arr.find((item,index,arr)=>{
    return item>2;
});
console.log(value)



// findIndex() 主要返回 找到第一个元素的索引
let index=arr.findIndex((item,index,arr)=>{
    return item>2;
});
console.log(index);

