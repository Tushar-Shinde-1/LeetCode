/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} s
 * @param {string[]} queries
 * @return {boolean[]}
 */
var palindromePath = function(n, edges, s, queries) {
    const adj = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const parent = new Int32Array(n).fill(-1);
    const depth = new Int32Array(n);
    const size = new Int32Array(n).fill(1);
    const heavy = new Int32Array(n).fill(-1);
    const order = [0];

    // Build parent, depth and traversal order.
    parent[0] = 0;

    for (let i = 0; i < order.length; i++) {
        const u = order[i];

        for (const v of adj[u]) {
            if (v === parent[u]) continue;

            parent[v] = u;
            depth[v] = depth[u] + 1;
            order.push(v);
        }
    }

    // Calculate subtree sizes and heavy children.
    for (let i = n - 1; i >= 0; i--) {
        const u = order[i];
        let maxSize = 0;

        for (const v of adj[u]) {
            if (parent[v] !== u) continue;

            size[u] += size[v];

            if (size[v] > maxSize) {
                maxSize = size[v];
                heavy[u] = v;
            }
        }
    }

    // Heavy-Light Decomposition.
    const head = new Int32Array(n);
    const pos = new Int32Array(n);
    let timer = 0;
    const stack = [[0, 0]];

    while (stack.length) {
        const [start, chainHead] = stack.pop();
        let u = start;

        while (u !== -1) {
            head[u] = chainHead;
            pos[u] = timer++;

            for (const v of adj[u]) {
                if (parent[v] === u && v !== heavy[u]) {
                    stack.push([v, v]);
                }
            }

            u = heavy[u];
        }
    }

    // Segment tree: XOR of character masks.
    let base = 1;
    while (base < n) base *= 2;

    const seg = new Int32Array(2 * base);

    for (let u = 0; u < n; u++) {
        seg[base + pos[u]] = 1 << (s.charCodeAt(u) - 97);
    }

    for (let i = base - 1; i > 0; i--) {
        seg[i] = seg[2 * i] ^ seg[2 * i + 1];
    }

    function update(u, c) {
        let i = base + pos[u];
        seg[i] = 1 << (c.charCodeAt(0) - 97);

        for (i >>= 1; i > 0; i >>= 1) {
            seg[i] = seg[2 * i] ^ seg[2 * i + 1];
        }
    }

    // XOR query on inclusive range [l, r].
    function rangeQuery(l, r) {
        let result = 0;
        l += base;
        r += base + 1;

        while (l < r) {
            if (l & 1) result ^= seg[l++];
            if (r & 1) result ^= seg[--r];

            l >>= 1;
            r >>= 1;
        }

        return result;
    }

    // XOR mask of all nodes along path u -> v.
    function pathQuery(u, v) {
        let mask = 0;

        while (head[u] !== head[v]) {
            if (depth[head[u]] < depth[head[v]]) {
                [u, v] = [v, u];
            }

            mask ^= rangeQuery(pos[head[u]], pos[u]);
            u = parent[head[u]];
        }

        if (depth[u] > depth[v]) {
            [u, v] = [v, u];
        }

        mask ^= rangeQuery(pos[u], pos[v]);

        return mask;
    }

    const answer = [];

    for (const q of queries) {
        const parts = q.split(" ");

        if (parts[0] === "update") {
            const u = Number(parts[1]);
            update(u, parts[2]);
        } else {
            const u = Number(parts[1]);
            const v = Number(parts[2]);

            const mask = pathQuery(u, v);

            // True if at most one bit is set.
            answer.push((mask & (mask - 1)) === 0);
        }
    }

    return answer;
};