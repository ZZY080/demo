class Node {
    constructor(value,path){
        this.value = value;
        this.path=path;
        this.left= null;
        this.right = null;
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null;
    }
    insert(value,path){
        const newNode = new Node(value,path);
        if(!this.root){
            this.root = newNode;
        }else {
            this.insertNode(this.root,newNode);
        }
    }
    insertNode(node,newNode){
        if(newNode.value<node.value){
            if(!node.left){
                node.left = newNode;
            }else {
                this.insertNode(node.left,newNode);
            }
        }else {
            if(!node.right){
                node.right = newNode;
            }else{
                this.insertNode(node.right,newNode);
            }
        }
    }
    find(value){
        return this.findNode(this.root,value);
    }
    findNode(node,value){
        if(!node){
            return null;
        } else if(value<node.value){
            return this.findNode(node.left,value);
        }else if (value>node.value){
            return this.findNode(node.right,value);
        }else {
            return node.path;
        }
    }
}

// 创建二叉搜索树
const bst = new BinarySearchTree();
bst.insert(3,"/home");
bst.insert(1,"/about");
bst.insert(4,"/contact");

const path = bst.find(1);
console.log(path);

const notfound = bst.find(2);
console.log(notfound);