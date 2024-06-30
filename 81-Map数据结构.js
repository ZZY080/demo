let m = new Map([['name','kenny'],['sex','男'],['age',18]]);
console.log(m,m.size);
m.set("grade",'四年级');
console.log(m,m.size);

console.log(m.get("name"));
console.log(m.has("name"));
console.log(m.delete("name"));
// console.log(m.clear());
m.forEach(function(value, key, origin){
    console.log(value, key, origin);
})