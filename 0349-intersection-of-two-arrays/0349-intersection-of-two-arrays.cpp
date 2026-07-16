class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {

        unordered_set<int >s;
    set<int>ans;

        for( auto x: nums1)
        {
            s.insert(x);
        }

        for( auto x: nums2)
        {
            if(s.find(x)!=s.end())
            {
                ans.insert(x);
            }
        }
        vector<int>a(ans.begin(),ans.end());
        return a;
    }
};