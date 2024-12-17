const express=require("express");
const app=express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);

app.set("view engine","ejs");
let path=require("path");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public"))); 





const listings=require("./routes/listing.js");
app.use("/listing",listings);


app.listen("3000",(req,res)=>{
    console.log("app is listening on port 3000");
});

app.get("/",(req,res)=>{
    res.send("this is root path.");
});




