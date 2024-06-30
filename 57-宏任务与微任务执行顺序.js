
setTimeout(() => {
    console.log("定时器");
}, 0);
Promise.resolve().then(value => {
    console.log('Promise');
})
console.log('console');

