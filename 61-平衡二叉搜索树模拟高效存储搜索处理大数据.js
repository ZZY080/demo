class Node {
    constructor(value){
        this.value=value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree{
    constructor(){
        this.root=null;
    }
    getHeight(node){
        if(node===null) return 0;
        return node.height;
    }
    getBalanceFactor(node){
        if(node===null) return 0;
        return this.getHeight(node.left)-this.getHeight(node.right);
    }
    insert(value){
        this.root = this.insertNode(this.root,value);
    }
    insertNode(node,value){
        if(node===null) return new Node(value);
        if(value<node.value){
            node.left= this.insertNode(node.left,value);
        }else if(value>node.value){
            node.right = this.insertNode(node.right,value);
        }else {
            return node ;// 防止插入重复节点
        }
        node.height = 1+Math.max(this.getHeight(node.left),this.getHeight(node.right));
        const balanceFactor = this.getBalanceFactor(node);
        if(balanceFactor>1&&value<node.left.value){
            return this.rotateLL(node);
        }
        if(balanceFactor>1&&value>node.left.value){
            node.left= this.rotateRR(node.left);
            return this.rotateLL(node);
        }
        if(balanceFactor<-1&&value>node.right.value){
            return this.rotateRR(node);
        }
        if(balanceFactor<-1&&value<node.right.value){
            node.right = this.rotateLL(node.right);
            return this.rotateRR(node)
        }
        return node;
    }
    rotateLL(node){
        const temp = node.left;
        node.left = temp.right;
        temp.right = node;
        node.height = 1+Math.max(this.getHeight(node.left),this.getHeight(node.right));
        temp.height = 1+Math.max(this.getHeight(temp.left),this.getHeight(temp.right));
        return temp;
    }
    rotateRR(node){
        const temp = node.right;
        node.right = temp.left;
        temp.left = node;
        node.height = 1+Math.max(this.getHeight(node.left),this.getHeight(node.right));
        temp.height = 1+Math.max(this.getHeight(temp.left),this.getHeight(temp.right));
        return temp;
    }
}

// 使用AVL 树进行存储 搜索和处理大数据
const avl = new AVLTree();
avl.insert(10);
avl.insert(20);
avl.insert(30)
avl.insert(40)
avl.insert(50)
avl.insert(25)

console.log(avl.root)  // 输出根节点的值