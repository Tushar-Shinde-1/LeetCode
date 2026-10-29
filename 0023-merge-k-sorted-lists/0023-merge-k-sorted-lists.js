
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (!lists.length) return null;

    const heap = [];

    function push(node) {
        heap.push(node);
        let i = heap.length - 1;

        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (heap[p].val <= heap[i].val) break;

            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    }

    function pop() {
        if (heap.length === 1) return heap.pop();

        const min = heap[0];
        heap[0] = heap.pop();

        let i = 0;

        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (
                left < heap.length &&
                heap[left].val < heap[smallest].val
            ) {
                smallest = left;
            }

            if (
                right < heap.length &&
                heap[right].val < heap[smallest].val
            ) {
                smallest = right;
            }

            if (smallest === i) break;

            [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
            i = smallest;
        }

        return min;
    }

    for (const node of lists) {
        if (node !== null) push(node);
    }

    const dummy = new ListNode(0);
    let tail = dummy;

    while (heap.length > 0) {
        const node = pop();

        tail.next = node;
        tail = node;

        if (node.next !== null) {
            push(node.next);
        }
    }

    tail.next = null;
    return dummy.next;
};
