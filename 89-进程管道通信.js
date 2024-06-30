// 模拟管道通信的对象
const pipeline ={
    events:{},
    // 写入数据到管道
    write:function(event,data){
        if(!this.events[event]){
            this.events[event]=[];
        }
        this.events[event].push(data);
    },
    // 从管道读取数据
    read(event){
        if(!this.events[event]||this.events[event].length===0){
            return null;
        }
        return this.events[event].shift();
    },
}

function process1(){
    pipeline.write("myEvent","Data sent through pipeline");
    console.log("Process 1 writes to pipeline");
    
}

function process2(){
    const data = pipeline.read("myEvent");
    if(data!==null){
        console.log("Process 2 reads from pipeline:",data);
    }
}

// 模拟进程的异步执行
setInterval(process1,1000)
setInterval(process2,1000)