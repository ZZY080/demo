const calculator =(function(){
    let result = 0; // 私有变量
    function add(x,y){ // 私有方法
        return x+y;
    }
    function subtract(x,y){
        return x-y;
    }
    return {
        add:function(x,y){
            result=add(x,y);
        },
        subtract:function(x,y){
            result=subtract(x,y);
        },
        getResult:function(){
            return result;
        }
    }
})();

// 使用模块
calculator.add(5,3);
console.log(calculator.getResult());

calculator.subtract(10,5);
console.log(calculator.getResult());
