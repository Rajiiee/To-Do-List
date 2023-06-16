const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items=[];
const workItems=[];

app.get("/",function(req,res){
    let today = new Date();
    let options ={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    let day =today.toLocaleDateString("en-us",options);

    res.render("list",{kindOfList:"Everyday",newListItem:items});
});

app.post("/",function(req,res){
    console.log(req.body);

    let item=req.body.newItem;
    
    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }  
})

app.get("/work",function(req,res){
    res.render("list",{kindOfList:"Work",newListItem:workItems});
})

app.listen(3000,function(){ 
    console.log("Server is up at port 3000");
});