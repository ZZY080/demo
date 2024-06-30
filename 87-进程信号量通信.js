class Semaphore {
    constructor(count){
        this.count=count; // 初始化信号量计数器 用于控制同时只能处理一个进程
        this.queue = []; // 存储等待执行的任务队列
    }
    // 信号量的减操作，尝试获取资源
    acquire(task){
        if(this.count>0){
            this.count--;
            task();
        }else {
            this.queue.push(task);
        }
    }
    // 信号量的加操作，尝试释放资源
    release(){
        this.count++;
        if(this.queue.length>0){
            // 取出队列中的下一个任务
            const nextTask = this.queue.shift();
            // 执行任务
            this.acquire(nextTask);
        }
    }
}
// 初始化信号量
const semaphore = new Semaphore(1);
// 创建模拟任务
const task1 = ()=>{
    console.log("Task1 1 executed.");
    setTimeout(()=>{
        semaphore.release(); // 释放资源
    },4000)
    
}
const task2 = ()=>{
    console.log("Task2 2 executed.");
    semaphore.release(); // 释放资源
}

// 获取资源执行
semaphore.acquire(task1);
semaphore.acquire(task2);
