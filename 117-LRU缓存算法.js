class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = {};
        this.head = new Node();
        this.tail = new Node();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    get(key) {
        if (this.cache[key]) {
            const node = this.cache[key];
            this._removeNode(node);
            this._addToFront(node);
            return node.value;
        } else {
            return -1;
        }
    }

    put(key, value) {
        if (this.cache[key]) {
            const node = this.cache[key];
            node.value = value;
            this._removeNode(node);
            this._addToFront(node);
        } else {
            const newNode = new Node(key, value);
            this.cache[key] = newNode;
            this._addToFront(newNode);
            if (Object.keys(this.cache).length > this.capacity) {
                const leastUsedNode = this.tail.prev;
                this._removeNode(leastUsedNode);
                delete this.cache[leastUsedNode.key];
            }
        }
    }
}

function parseInput(input) {
    const lines = input.trim().split('\n');
    const [capacity, k] = lines[0].split(' ').map(Number);
    const operations = lines.slice(1).map(line => line.split(' '));
    return { capacity, k, operations };
}

function executeLRUCache(capacity, operations) {
    const lruCache = new LRUCache(capacity);
    const results = [];
    for (const [type, key, value] of operations) {
        if (type === 'Q') {
            results.push(lruCache.get(key));
        } else if (type === 'A') {
            lruCache.put(key, value);
        } else if (type === 'D') {
            delete lruCache.cache[key];
        }
    }
    return results;
}

// Reading input from stdin
let input = '';
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', data => {
    input += data;
});

process.stdin.on('end', () => {
    const { capacity, k, operations } = parseInput(input);
    const results = executeLRUCache(capacity, operations);
    for (const result of results) {
        console.log(result);
    }
});

