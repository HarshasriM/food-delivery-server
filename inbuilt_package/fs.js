const fs = require("fs");
const quote = "Make every day a little less ordinarily";
//wrtiing into a file
fs.writeFile(("cool.txt"),quote,()=>{
    console.log("completed writing into file");
});
//reading into a file
fs.readFile("cool.txt","utf-8",(err,data)=>{
    if(err){
        console.log("Errorx",err);
    }
    console.log("The content of the file =>",data);
});
const quote2 = "Dream is not that you see in sleep , dream is something";
fs.appendFile("cool.txt",quote2,(err)=>{
    if(err) throw err
    console.log("appended data successfully");
}
);
fs.unlink("cool.txt",(err)=>{
    console.log("deleted successfully");
});
