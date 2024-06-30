const obj1 = {
    name: 'qianguyihao',
    age: 28,
    info: {
        desc: '很厉害',
    },
};
const obj2={
   age:29,
   sex:"男"
}
const obj100={};
let ob2 = Object.assign(obj100,obj1,obj2);
console.log(ob2)