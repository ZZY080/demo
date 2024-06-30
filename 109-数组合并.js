const objs=[
    {
        name:'张三',
        fruit:'peach'
    },
    {
        name:'李四',
        fruit:'apple'
    },
    {
        name:'张三',
        fruit:'orange'
    },
    {
        name:'李四',
        fruit:'pear'
    }
];

let results=objs.reduce((pre,cur)=>{
    // 返回符合的元素
    let existingobj=pre.filter((item,index)=>item.name===cur.name);
    if(existingobj.length!=0){
        existingobj[0].fruit+=","+cur.fruit;
    }else{
        pre.push(cur);
    }
    return pre;
},[])
console.log(results);
