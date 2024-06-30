function memo(func) {
    const cache = {};
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log('Fetching from cache:', key);
            return cache[key];
        } else {
            const result = func(...args);
            cache[key] = result;
            return result;
        }
    };
}


const sum = memo((a, b) => {
    console.log('Calculating sum');
    return a + b;
});

console.log(sum(1, 2));
console.log(sum(1, 2)); // Fetching from cache: [1,2], 3
console.log(sum(2, 3)); // Calculating sum, 5
