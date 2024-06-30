const routes = {
    "/":()=> console.log("Home page"),
    "/about":()=>console.log("About page"),
    "/contact":()=>console.log("Contact page"),
    "/404":()=>console.log("Page not found"),
}

const router = (path)=>{
    if(routes[path]){
        routes[path]();
    }else {
        routes["/404"]();
    }
}

// 模拟路由请求
router("/");
router("/about");
router("/contact");
router("/services");