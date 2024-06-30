function flattens(sourceArray,flattenedArray=[]){
    for(const element of sourceArray){
        if(Array.isArray(element)){
            flattens(element,flattenedArray);
        } else {
            flattenedArray.push(element);
        }
    }
    return flattenedArray;
}
const arr =[[0],1,2,[3,[4,5],6]]
console.log(flattens(arr)); 

