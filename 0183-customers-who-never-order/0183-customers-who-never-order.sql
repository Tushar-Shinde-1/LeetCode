# Write your MySQL query statement below
select a.name as Customers from Customers a left join Orders as  b on  a.id=b.customerId where b.customerId is null;