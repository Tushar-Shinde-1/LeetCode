class Solution {
public:
    bool isValid(string s) {
        stack<char> s1;
    for( auto x: s)
    {
        if( x=='('||x=='['||x=='{')
        {
            s1.push(x);
        }
        else if(s1.empty())
        {
            return false;
        }
        else if(x==')' && s1.top()=='(')
        {
            s1.pop();
        }
         else if(x==']' &&s1.top()=='[')
        {
            s1.pop();
        }
        else if(x=='}' &&s1.top()=='{')
        {
            s1.pop();
        }
        else{
            return false;
        }
    }

    if(s1.empty())
    {
        return true;
    }
    return false;
        
    }
};