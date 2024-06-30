// 1. filter findIndex 方法的结合
const arr1_1 = [{ id: 1, name: "a" }, { id: 2, name: "b" },
{ id: 1, name: "c" }, { id: 3, name: "d" }];

const arr1_2 =arr1_1.filter((item,index,arr1_1)=>{
   return  arr1_1.findIndex(subItem=> item.id == subItem.id)==index;
});
console.log(arr1_2);

// 2. reduce 方法 init 初始为一个数组 item 为每一项
let arr1_3 =arr1_1.reduce((init,item)=>{
    if(!init.find(subitem=>subitem.id==item.id)){
        init.push(item);
    }
    // if(!init.some(subitem=>subitem.id==item.id)){
    //     init.push(item);
    // }
    return init;
},[]);
console.log(arr1_3);

// 3. 使用forEach 和 .some
let arr1_4  = [];
arr1_1.forEach((item)=>{
    if(!arr1_4.some(subitem=>subitem.id==item.id)){
        arr1_4.push(item);
    }
})
console.log(arr1_4);

// 4. map 结构去重  [[1,{ id: 1, name: "a" }]] 进行映射
let arr1_5 = [...new Map(arr1_1.map(item=>[item.id,item])).values()];
console.log([...new Map(arr1_1.map(item=>[item.id,item])).values()]);
// console.log(arr1_5);

// 5. Object.create()
// 使用Object.create()，按照对象的属性来判断是否重复，代码如下
let arr1_6 = arr1_1.filter(function(item){
    // this 指向空对象
    return !this[item.id]&&(this[item.id]=true);
},Object.create(null));
console.log(arr1_6);

// 6 For const of 和 find 结合
let arr1_7 = [];
for(const item of arr1_1){
    if(!arr1_7.some((subitem)=>subitem.id==item.id)){
        arr1_7.push(item)
    }
}
console.log(arr1_7);
