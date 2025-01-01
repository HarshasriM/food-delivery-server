const express = require('express');
const app = express();//calling the express through function
//const { MongoClient } = require('mongodb');
//http->get,post,put,delete
//req,res can also be written as request and response
// "/" is my request and " hello world " is my response
const mongo =require("mongodb");
var cors = require("cors");
const MongoClient = mongo.MongoClient
const PORT = 4000
app.use(cors())
app.use(express.json());

const MONGO_URL ="mongodb://127.0.0.1:27017"
//mongodb://localhost:27017
let db;
/*const locations=[
    {
    "location_id": 1,
    "location_name": "Ashok Vihar Phase 3, New Delhi",
    "state_id": 1,
    "state": "Delhi",
    "country_name": "India"
},
{
    "location_id": 4,
    "location_name": "Bibvewadi, Pune",
    "state_id": 2,
    "state": "Maharashtra",
    "country_name": "India"
},
{
    "location_id": 8,
    "location_name": "Jeevan Bhima Nagar, Bangalore",
    "state_id": 3,
    "state": "Karnataka",
    "country_name": "India"
},
{
    "location_id": 13,
    "location_name": "Sector 40, Chandigarh",
    "state_id": 4,
    "state": "Punjab",
    "country_name": "India"
}

];*/

app.get('/',(req, res)=> {
  res.send('Welcome to restaurant app');
});

//to create endpoint for locations

//GET locations
app.get('/locations',(req, res)=> {
    //to convert documents to array of objects - server understands we use toArray() method in js
    //but it returns an empty array so we will pass callback in toArray() method
    db.collection("locations").find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
    //if we are not mentioned specified database to connect then we use
    //db("edureka-fsw").collection("locations").find()
});



//get meal Type
app.get('/quicksearch',(req,res)=>{
    db.collection("mealType").find().toArray((err,result)=>{
        if (err) throw err
        res.send(result)
    });
});



//get restaurant data
/*app.get("/restaurants",(req,res)=>{
    db.collection("restaurants").find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});*/

//to get restaurants data based on stateId or mealId
app.get("/restaurants",(req,res)=>{
    //destructing the query
    let query = {}
    let stateId = +req.query.state_id
    let mealId = +req.query.meal_id
    if(stateId){
        query = {state_id:stateId}
    }
    else if(mealId){
        query = {"mealTypes.mealtype_id":mealId}
    }
    db.collection("restaurants").find(query).toArray((err,result)=>{
        if (err) throw err
        res.send(result);
    });
});

//filter based on cuisine , cost ,meal
app.get("/filter/:mealId",(req,res)=>{
    let query={}
    let mealId = +req.params.mealId
    let cuisineId = +req.query.cuisine_id
    let lcost = +req.query.lcost
    let hcost = +req.query.hcost
    let sort = {cost:1}

    if(req.query.sort){
        sort = {cost :req.query.sort}
    }
    if(cuisineId && lcost && hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId,
            $and : [{ cost : {$gt:lcost , $lt:hcost}}]
        }
    }
    else if(cuisineId){
        query = {
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }
    else if(lcost && hcost){
        query = {
            "mealTypes.mealtype_id":mealId,
            $and: [{ cost : {$gt:lcost , $lt:hcost}}]
        }
    }
    else if(cuisineId && lcost && hcost){
        query={
            "mealTypes.mealtype_id":mealId,
            $and : [{"cuisines.cuisine_id":cuisineId}],
            $and : [{ cost : {$gt:lcost , $lt:hcost}}]
        }
    }
    db.collection("restaurants").find(query).sort(sort).toArray((err,result)=>{
        if (err) throw err
        res.send(result);
    });

    //-1 ==== descending
    //1 ==== ascending
});


//details of restaurants

app.get("/details/:res_id",(req,res)=>{

    let res_id = +req.params.res_id;
    let query = {restaurant_id :res_id};

    db.collection("restaurants").find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    });
});

//get the menu of all restaurant
 app.get("/menu",(req,res) =>{

    db.collection("restaurantsMenu").find().toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    });
 });


 //get the menu of a restaurant
 app.get("/menu/:res_id",(req,res) =>{

    let res_id = +req.params.res_id;
    let query = {restaurant_id: res_id}
    db.collection("restaurantsMenu").find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    });
 });


 //POST method has started
 //details selected menuItems  by user

 app.post("/menuItem",express.json(),(req,res)=>{

    if(Array.isArray(req.body)){
        db.collection("restaurantsMenu").find({menu_id:{$in:req.body}}).toArray((err,result) =>{
            if(err) throw err;
            res.send(result)
        })
    }
    else{
        res.send("Invalid menuId's")
    }
 })

 //Place order

 app.post("/placeorder",(req,res)=>{

    console.log(req.body);
    db.collection("orders").insertOne(req.body,(err) =>{
        if(err) throw err;
        res.send("orderPlaced")
     });
 })

 //get details of all order
 /*app.get("/orders",(req,res) =>{

    db.collection("orders").find().toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    });
 });*/

 //get details of order wrt user
 app.get("/orders",(req,res)=>{
    let query ={};
    let emailId= req.query.email;
    if(emailId){
        query = {email:emailId};
    }
    db.collection("orders").find(query).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
 });

 //deleteorder
 app.delete("/deleteorder/:id",(req,res)=>{
    let oid = +req.params.id
    db.collection("orders").deleteOne({orderId:oid},(err)=>{
        if(err) throw err
        res.send("order deleted succsessfully");
    })
 })

 //update payment detailes
 app.put("/updateorder/:id",(req,res)=>{
    let oid = +req.params.id
    db.collection("orders").updateOne({orderId:oid},
    {
        $set:{
            status:req.body.status,
            bank_name:req.body.bank_name,
            date: req.body.date
        
    }},(err)=>{
        if(err) throw err
        res.send("order updated succsessfully");
    })
 })












//Mongo connection

MongoClient.connect(MONGO_URL,(err,client)=>{
    console.log("Mongo is connected");
    if(err) console.log("Error while connecting to mongo db")
    db = client.db("edureka-fsw")
    app.listen(PORT,()=> console.log("Server connected on the Port",PORT))
})