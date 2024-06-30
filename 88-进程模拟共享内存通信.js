// 模拟共享内存
const sharedMemory = {
    data:{},
     // 写入数据到共享内存
     write(key,value){
        this.data[key]=value;
    },
    // 从共享内存读取数据
    read(key){
        return this.data[key];
    },
   
}

// 两个模拟进程读写共享内存
function process1(){
    sharedMemory.write("myKey","Hello shared memory!");
    console.log("Process 2 writes to  shared memory:");
}

function process2(){
    const data = sharedMemory.read("myKey");
    console.log("Process 1 read from shared memory:",data)
   
}

setTimeout(process1,1000);
setTimeout(process2,2000);