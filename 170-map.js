let starMap = new Map();
starMap.set('option1', [
  { name: 'kenny1', age: 12 },
  { name: 'kenny2', age: 28 },
  { name: 'kenny3', age: 29 },
]);
starMap.set('option2', [
  { name: 'my', age: 12 },
  { name: 'my', age: 28 },
  { name: 'my', age: 29 },
]);
starMap.set('option3', [
  { name: 'nv', age: 12 },
  { name: 'nv', age: 28 },
  { name: 'nv', age: 29 },
]);

starMap.delete('option3');

console.log(starMap);

console.log(!![]);
