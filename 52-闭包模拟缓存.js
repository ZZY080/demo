function createCache(){
    const cache = {};
    return {
        set:function(key,value){
            cache[key]=value;
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
                if(cache.hasOwnProperty(key)){
                    delete cache[key];
                }
            }
        }
    }
}

// 创建一个缓存实例
const cacheInstance = createCache();

// 设置缓存数据
cacheInstance.set("name","kenny1");
cacheInstance.set("age","12");
cacheInstance.set("sex","男");

// 获取缓存数据
console.log(cacheInstance.get("name"));

// 删除单个项
cacheInstance.removeItem("age");

// 获取全部项目
console.log(cacheInstance.getAll());

// 清楚缓存数据
cacheInstance.clear();
console.log(cacheInstance.get("name"));



