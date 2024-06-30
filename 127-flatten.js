function flatten(obj) {
    const result = [];

    function recursiveFlatten(value) {
        if (Array.isArray(value)) {
            value.forEach(item => recursiveFlatten(item));
        } else if (value && typeof value === 'object') {
            Object.values(value).forEach(item => recursiveFlatten(item));
        } else {
            result.push(value);
        }
    }
    recursiveFlatten(obj);
    return result;
}

// 示例
const nestedObject = {
    a: [1, [2], [3]],
    b: [2, 3, { d: 4, e: [5, 6, null] }],
    c: { f: 7, g: [8, 9, { h: 10 }] }
};

console.log(flatten(nestedObject)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
