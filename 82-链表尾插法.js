class Node {
    constructor(value){
        this.value=value;
        this.next = null;
    }
}
class Head{
    constructor(){
        this.count=0;
        this.next = null;
    }
}

// 尾插法
function insert(head,value){
    const node = new Node(value);
    if(head.next==null){
        head.next=node;
    }else{
        let tem_node = head.next;
        while(tem_node.next!=null){
            tem_node=tem_node.next;
        }
        tem_node.next = node;
    }
}

let head = new Head();
insert(head,1)
insert(head,2)
insert(head,3)
insert(head,4)
console.log(head)
