class  Node{
    constructor(value){
        this.value = value;
        this.pre=null;
    }
}

class Tail{
    constructor(){
        this.count=0;
        this.pre = null;
    }
}

function insert(tail,value){
    const node = new Node(value);
    if(tail.pre==null){
        tail.pre=node;
    }else {
        let temp = tail.pre;
        while(temp.pre!=null){
            temp=temp.pre;
        }
        temp.pre=node;
    }

}

const tail = new Tail();
insert(tail,1)
insert(tail,2)
insert(tail,3)
console.log(tail)