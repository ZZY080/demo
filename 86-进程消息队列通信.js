// 创建一个事件发射器(模拟进程)
import EventEmitter  from "events"
const  eventEmitter = new EventEmitter();

// 订阅事件(消息队列通信)
eventEmitter.on("message",(message)=>{
    console.log("Received message:",message);
    // 发送响应消息
    setInterval(()=>{
        eventEmitter.emit("response","Response to"+message);
    },1000);
});

// 发送消息到事件队列
eventEmitter.emit("message","Hello,this is a message");

// 订阅响应消息
eventEmitter.on("response",(response)=>{
    console.log("Received response:",response)
})