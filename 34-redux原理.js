const obj = {
    a: {
        // 为了安全的更新 obj.a.c，需要先复制一份
        c: 3
    },
    b: 2
}
const obj2 = {
    // obj 的备份
    ...obj,
    // 覆盖 a
    // a: {
    //     // obj.a 的备份
    //     ...obj.a,
    //     // 覆盖 c
    //     c: 42
    // }
}
console.log(obj.a==obj2.a)
console.log(obj)
console.log(obj2)

const arr = ['a', 'b'];
// 创建 arr 的备份，并把 c 拼接到最后。
const arr2 = arr.concat('c');
// 或者，可以对原来的数组创建复制体
const arr3 = arr.slice();
// 修改复制体
arr3.push('c');
console.log(arr==arr3)