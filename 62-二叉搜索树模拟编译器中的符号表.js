class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class SymbolTable {
    constructor() {
        this.root = null;
    }

    insert(value) {
        if (this.root === null) {
            this.root = new TreeNode(value);
        } else {
            this.insertNode(this.root, value);
        }
    }

    insertNode(node, value) {
        if (value < node.value) {
            if (node.left === null) {
                node.left = new TreeNode(value);
            } else {
                this.insertNode(node.left, value);
            }
        } else if (value > node.value) {
            if (node.right === null) {
                node.right = new TreeNode(value);
            } else {
                this.insertNode(node.right, value);
            }
        }
    }

    search(value) {
        return this.searchNode(this.root, value);
    }

    searchNode(node, value) {
        if (node === null) {
            return false;
        } else if (value === node.value) {
            return true;
        } else if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }
}

// 模拟编译器中的符号表
const symbolTable = new SymbolTable();
symbolTable.insert('variable1');
symbolTable.insert('variable2');
symbolTable.insert('function1');
symbolTable.insert('function2');

console.log(symbolTable.search('variable1')); // 输出 true
console.log(symbolTable.search('variable3')); // 输出 false
