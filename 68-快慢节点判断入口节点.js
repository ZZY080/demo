class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function detectCycle(head) {
    let slow = head;
    let fast = head;
    let hasCycle = false;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            hasCycle = true;
            break;
        }
    }

    if (!hasCycle) {
        return null;
    }

    // 重新将slow指针指向头部
    slow = head;

    // 两个指针以相同的速度移动直到再次相遇
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

// 创建一个带环的链表
let head = new ListNode(3);
let node1 = new ListNode(2);
let node2 = new ListNode(0);
let node3 = new ListNode(-4);

head.next = node1;
node1.next = node2;
node2.next = node3;
node3.next = node1; // 这里形成了环

let result = detectCycle(head);
console.log(result ? result.val : "No cycle found");
