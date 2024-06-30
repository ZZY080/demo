function createCounter(){
    let count = 0; // 私有变量
    function changeBy(val){ // 私有函数
        count+=val;
    }
    return {
        increment:function(){
            changeBy(1);
        },
        decrement:function(){
            changeBy(-1);
        },
        getvalue:function(){
            return count;
        }

    }
}

// 创建一个计数器实例
const counter = createCounter();

// 增加计数器的值
counter.increment();
counter.increment();
counter.increment();
counter.increment();

// 减少计数器的值
counter.decrement();

// 获取计数器的值
console.log(counter.getvalue())
