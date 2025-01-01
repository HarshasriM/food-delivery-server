## Page1

List of cities /locations (GET)

http://localhost:4000/locations

List of mealTypes /quicksearch (GET)

http://localhost:4000/quicksearch

List of restaurants (GET)

http://localhost:4000/restaurants

List of restaurants based on state_id
restaurants wrt city (GET)

http://localhost:4000/restaurants?state_id=1


## Page2

restaurants wrt mealid (GET)
http://localhost:4000/restaurants?meal_id=1

filtering started (GET)

restaurants wrt to mealid and cuisineid (GET)
http://localhost:4000/filter/5?cuisine_id=3


restaurants wrt cost range and mealId (GET)
http://localhost:4000/filter/1?lcost=200&hcost=500

restaurants wrt cost range, cuisine_id and mealid (GET)
http://localhost:4000/filter/1?lcost=200&hcost=1000&cuisine_id=2

sort on the basis of cost (GET)
http://localhost:4000/filter/1?lcost=200&hcost=500&sort=1

http://localhost:4000/filter/1?lcost=200&hcost=500&sort=-1


## Page 3

Details of each restaurant with restaurant id (GET)
http://localhost:4000/details/1

menu of all restaurants
http://localhost:4000/menu

get a menuitems of a restaurant (GET)
http://localhost:4000/menu/1

## Page 4

MenuItems data which are selected by user (POST)
http://localhost:4000/menuItem

input=> [1,2,3]

placeorder (POST)
after placing the order adding details to database

ex:
{
    "orderId":1,
    "name":"peter",
    "email":"peter@gmail.com"
    "address":"Home 5"
    "phone":56899226777
    "cost":577,
    "restName":"Domino's Pizza",
    "menuItem":[1,2,3]
}
http://localhost:4000/placeorder

## Page 5

get all order details (GET)
only admin can use it
http://localhost:4000/orders

get order details wrt email (his/her order)  (GET)
http://localhost:4000/orders?email=peter@gmail.com

deleteorder (DEL)
http://localhost:4000/deleteorder/1

update payment detailes (PUT)
{
    "status":"Delivered"
    "bank_name":"HDFC"
    "date":"12-23-23"
}