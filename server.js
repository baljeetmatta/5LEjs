const express=require("express");
const app=express();
app.use(express.json());

const cookieParser=require("cookie-parser");
const sessions=require("express-session");

app.use(cookieParser());
app.use(sessions({
    secret:'asdas@#$#',
    saveUninitialized:true,
    resave:false,
    cookie:{maxAge:300000}
}));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{

    console.log("Request Received");
    res.render("index",{yourname:"Code Quotient",courses:["course1","course2","course3"]});


})

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/login",(req,res)=>{
    res.render("login",{msg:""});

})

app.post("/login",(req,res)=>{

    if(req.body.username==req.body.password)
    {
        req.session.username=req.body.username;
        res.redirect("/dashboard");
    }
    else
    {
        res.render("login",{msg:'Invalid user/password'});
    }
})
app.get("/dashboard",(req,res)=>{
    res.render("dashboard",{user:req.session.username});
    
})
app.listen(3000,(err)=>{
    if(err)
    console.log("Server not started ",err);
    else
    console.log("Serer Started");
})