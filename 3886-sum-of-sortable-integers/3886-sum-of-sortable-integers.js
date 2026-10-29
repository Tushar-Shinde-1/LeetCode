
var sortableIntegers = function(nums) {
    const n = nums.length;

    const prefMax = new Array(n + 1).fill(0);
    const suffMin = new Array(n + 1).fill(Infinity);
    const prefDrop = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        prefMax[i + 1] = Math.max(prefMax[i], nums[i]);
    }

    for (let i = n - 1; i >= 0; i--) {
        suffMin[i] = Math.min(nums[i], suffMin[i + 1]);
    }

    for (let i = 1; i < n; i++) {
        prefDrop[i] =
            prefDrop[i - 1] + (nums[i - 1] > nums[i] ? 1 : 0);
    }

    function check(k) {
        for (let start = 0; start < n; start += k) {
            const end = start + k - 1;

            let drops = prefDrop[end] - prefDrop[start];

            if (nums[end] > nums[start]) {
                drops++;
            }

            if (drops > 1 || prefMax[start] > suffMin[start]) {
                return false;
            }
        }

        return true;
    }

    let ans = 0;

    for (let k = 1; k * k <= n; k++) {
        if (n % k === 0) {
            if (check(k)) ans += k;

            const other = n / k;

            if (other !== k && check(other)) {
                ans += other;
            }
        }
    }

    return ans;
};
