class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int first =0;
        int second=0;

        while( first<nums.size())
        {
            if(nums[first]!=0)
            {
                nums[second++]=nums[first];
            }
            first++;
        }

        while(second<nums.size())
        {
            nums[second++]=0;
        }

        
   
        
    }
};