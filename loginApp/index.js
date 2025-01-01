const express = require("express");
const app = express();
const AuthController = require("./controller/authcontroller");
const PORT = 8000;
const db = require("./db");
var cors = require("cors");
app.use(cors());
app.use(express.json())
app.get('/',(req,res) =>{
    res.send("Login App");
});
//it is working as connecter between controller and index.js now we will add /auth to root endpoint and then add our endpoints
app.use("/auth",AuthController);
app.listen(PORT,()=>console.log("Sever is listening on port",PORT))