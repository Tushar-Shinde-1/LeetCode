
/**
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function(nums) {
    const MOD = 1000000007;
    const n = nums.length;

    // Precompute combinations using Pascal's Triangle
    const comb = Array.from(
        { length: n + 1 },
        () => Array(n + 1).fill(0)
    );

    for (let i = 0; i <= n; i++) {
        comb[i][0] = 1;
        comb[i][i] = 1;

        for (let j = 1; j < i; j++) {
            comb[i][j] =
                (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
        }
    }

    function dfs(arr) {
        if (arr.length <= 2) return 1;

        const root = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        const leftWays = dfs(left);
        const rightWays = dfs(right);

        const ways = comb[arr.length - 1][left.length];

        return Number(
            (BigInt(ways) *
             BigInt(leftWays) *
             BigInt(rightWays)) % BigInt(MOD)
        );
    }

    return (dfs(nums) - 1 + MOD) % MOD;
};
