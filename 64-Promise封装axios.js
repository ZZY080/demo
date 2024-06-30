const  {MyPromise} = require("./63-Promise实现.js");

const axios =(config)=>{
    return new MyPromise((resolve,reject)=>{
        const {url,method="get",data=null} = config;
        const xhr = new XMLHttpRequest();
        xhr.open(method,url,true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status>=200&&xhr.status<300){
                    resolve(xhr.responseText);
                }else {
                    reject(new Error(xhr.statusText));
                }
            }
        };
        xhr.onerror=function(){
            reject(new Error("Network Error"));
        };
        xhr.send(data);
    })
}

// 使用自定义的axios
axios({
    url:"https://www.baidu.com",
    method:"get",  
}).then((response)=>{
    console.log("Response:",response);
}).catch((error)=>{
    console.log("Error:",error);
})