class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int min_price=INT_MAX;
        int profit=0;

        for( auto price: prices)
        {
            min_price= min(min_price,price);
            profit=max(profit,price-min_price);

        }
        return profit;
    }
};