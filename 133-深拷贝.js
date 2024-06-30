function deepCopy(newObj,oldObj){
    for(let key in oldObj){
        let item = oldObj[key];
        if(item instanceof Array){
            newObj[key]=[];
            deepCopy(newObj[key],item);
        }else if(item instanceof Object){
            newObj[key]={};
            deepCopy(newObj[key],item);
        }else{
            newObj[key]=item;
        }
    }
}
let obj1={};
let obj2 = {
    name: 'qianguyihao',
    age: 28,
    info: {
        desc: 'hello',
    },
    color: ['red', 'blue', 'green'],
};
