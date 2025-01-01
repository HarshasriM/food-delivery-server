const mongoose = require("mongoose");

//defining our document structure
const userSchema = new mongoose.Schema(
    {
        name :String,
        email :String,
        password : String,
        phone : Number,
        role : String
    }
)
//users ---> Schema  userSchema ---> keeping the schema in users collection
let users = mongoose.model("users",userSchema);

module.exports = users;