class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {

        unordered_set<int >s;
    vector<int>ans;

        for( auto x: nums1)
        {
            s.insert(x);
        }

        for( auto x: nums2)
        {
            if(s.find(x)!=s.end())
            {
                ans.push_back(x);
                s.erase(x);
            }
        }
        
        return ans;
    }
};