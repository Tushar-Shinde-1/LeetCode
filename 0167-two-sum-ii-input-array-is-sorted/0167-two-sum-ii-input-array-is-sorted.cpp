class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        


    int first =0;
    int second = nums.size()-1;

    while(first<second)
    {
        int sum = nums[first]+nums[second];
        if(sum==target)
        {
            return {first+1, second+1};

        }
        else if(sum>target)
        {
            second--;

        }
        else{
            first++;
        }
    }

    return{};
    }
};