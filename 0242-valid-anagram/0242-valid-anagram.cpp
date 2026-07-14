class Solution {
public:
    bool isAnagram(string s, string t) {

        if(s.length()!=t.length())
        return false;

        vector<int>check(26,0);
        for( int i = 0;i < s.length();i++)
        {
            check[t[i]-'a']++;
            check[s[i]-'a']--;
        }

        for( auto x: check)
        {
            if(x!=0)return false;
        }
        
        return true;
    }
};