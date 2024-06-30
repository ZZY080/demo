let age:number=10;
let array1:number[]=[1,2,3];
type useArray = (number|string)[]
let arrayandstr:useArray=[1,2,3,"123"];
console.log("age:",age);
console.log("array1:",array1);
console.log("arrayandstr:",arrayandstr);

function add(param1:number,param2:number):number{
    return param1+param2;
}
const sub=(param1:number,param2:number):number=>{
    return param1-param2;
}

console.log(add(1,1));
console.log(sub(2,1))
function App(){
    return 1;
}