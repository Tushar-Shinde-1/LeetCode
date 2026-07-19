class Solution {
public:
    int removeDuplicates(vector<int>& nums) {

        if (nums.empty()) return 0;

        int  increment=0;
        int first=0;
        int second=1;

      while(second<nums.size())
      {
        if( nums[first]==nums[second])
        {
            second++;
        }
        else{
            first++;
            nums[first]=nums[second];
        }
      }
// int ans=first+1;
//       }
//       while(first<nums.size())
//       { first++;
//         nums[first]='_';
//       }
        
        return first+1;
    }
};