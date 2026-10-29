
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;

    let groupPrev = dummy;

    while (true) {
        // Find the kth node
        let kth = groupPrev;

        for (let i = 0; i < k && kth !== null; i++) {
            kth = kth.next;
        }

        // Not enough nodes left
        if (kth === null) break;

        const groupNext = kth.next;

        // Reverse the current group
        let prev = groupNext;
        let curr = groupPrev.next;

        while (curr !== groupNext) {
            const nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }

        // Connect the reversed group
        const oldGroupHead = groupPrev.next;
        groupPrev.next = kth;
        groupPrev = oldGroupHead;
    }

    return dummy.next;
};
