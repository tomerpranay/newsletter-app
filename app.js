const express=require('express');
const app=express();
const request=require('request');
const https=require("https");
const bodyparser=require('body-parser');
const { log } = require('console');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=String(req.body.email);
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }

            }
        ]
    };
    console.log(email);
    const jsond=JSON.stringify(data);
    
    const url="https://us21.api.mailchimp.com/3.0/lists/e89e7fe365";
    const opt={
        method:'POST',
        auth:'23784589:6e5f72838bfbe62202d65f3651c08f08-us21'
    }
    const request=https.request(url,opt,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/su.html");
        }
        else{
            res.sendFile(__dirname+"/fa.html");
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        });
    });
    request.write(jsond);
    request.end();
});
app.post("/failure",(req,res)=>{
    res.redirect("/");    
});

app.listen(process.env.PORT||3000,()=>{
    console.log("serever 3000");
});

