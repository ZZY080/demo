const eventLoop = {
    tasks:[],
    currentIndex:0,
    addTask(task,isMicro=false){
        if(isMicro){
            this.tasks.unshift(task); // 添加到微任务队列的开头
        }else{
            this.tasks.push(task); // 添加到宏任务队列的末尾
        }
      
    },
    run(){
        while(this.currentIndex<this.tasks.length){
            const task = this.tasks[this.currentIndex];
            if(typeof task === "function"){
                task();
            }
            this.currentIndex++;
        }
    },
   

}

// 宏任务
const task1 = ()=>{
    console.log("Task 1 executed");
    setTimeout(()=>{
        console.log("Task 1 ended");
        eventLoop.run();
    },2000)
};
// 模拟微任务
const task2 = ()=> {
    console.log("Task 2 executed");
    Promise.resolve().then(()=>{
        console.log("Task 2 ended");
    })
   
};
const task3 = ()=>console.log("Task 3 executed");


// 添加任务到事件循环
eventLoop.addTask(task1);
eventLoop.addTask(task2,true);
eventLoop.addTask(task3);

// 执行事件循环中的任务
eventLoop.run();