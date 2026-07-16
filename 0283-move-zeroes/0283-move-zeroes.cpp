class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int autoinc=0;

        for(auto x:nums)
        {
            if(x!=0)
            {
                nums[autoinc++]=x;
            }
        }

while(autoinc<nums.size())
{
    nums[autoinc++]=0;
}

        
    }
};