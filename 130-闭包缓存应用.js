function redis(){
    const cache={};
    return {
        set:function(key,value,expire){
            cache[key]=value;
            if(expire){
                setTimeout(()=>{
                    delete cache[key];
                },expire)
            } 
        },
        get:function(key){
            return cache[key];
        },
        removeItem:function(key){
            delete cache[key];
        },
        getAll:function(){
            return cache;
        },
        clear:function(){
            for(let key in cache){
                delete cache[key];
            }
        }
    }
}

const redisClient = redis();
redisClient.set("kenny",18,20000);
setInterval(()=>{
    console.log(redisClient.get("kenny"))
},1000)



