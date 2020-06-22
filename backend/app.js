const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');

const mongodb= require('mongodb').MongoClient;

const bcrypt= require('bcrypt');
 
const nodemailer = require("nodemailer");

require("dotenv").config();

const app= express();

app.use(cors());

app.use(bodyParser.json());
 
var db;


mongodb.connect("mongodb+srv://EmployeePortal:Emp123@cluster0-kyu6f.mongodb.net/EmployeePortal?retryWrites=true&w=majority",(error,database)=>{
   if(error){
       console.log("Database access denied");
   }

   else{
   db = database.db("EmployeePortal");
    console.log("DB connnected");
}
});

//CHECK FOR EMAIL ID EXIST OR NOT
app.get("/checkEmail/:email",(req,res)=>{
    //console.log(req.params)
    const checkEmail=req.params.email;
    db.collection("userdata").find({EmailId:checkEmail}).toArray((error,data)=>{     
           
      if(data.length!==0 || data==!null)
       {
            res.json(true)
        }
         else
         {
             res.json(false)
            }          
    });
 });


//FORGOT PASSWORD RESET
app.get("/forgetuser/:emailid",(req,res)=>{
    const forgetemail=req.params.emailid;
    console.log(forgetemail);
    db.collection("userdata").find({EmailId:forgetemail}).toArray((error,data)=>{  
              
        if(data.length!==0 || data==!null)
         {
            const transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port:465,
                auth:{
                    user:'projectemployeeportal@gmail.com',
                    pass:'Empportal@5'
                }
            })
            var mailoption={
                from:process.env.EMAIL,
                to:req.params.emailid,
                subject:"Reset Password",
                text:'Hi'+" "+data[0].FirstName+" "+data[0].LastName+'\n'+
                'You recently requested to reset you password for your account.'+'\n'+
                'Click the Link below to reset it.'+'\n\n'+
                'http://localhost:4200/resetpassword/'+data[0]._id+
                '\n\n' + 
                'if you have not made this request then you can safely ignore this email'+'\n'+
                'Thanks'+'\n'+
                'Team Freebees :)'
             }
               transporter.sendMail(mailoption,(error,res)=>{
               if(error)
               {
                 console.log(error)
                }
                else{
                    console.log(res)
            }
            
         })
           res.json(true)
          }
           else
           {
               res.json(false)
                             
           }          
      });
});
app.put("/resetpassword",async (req,res)=>{

    const ReSalt= await bcrypt.genSalt();

    const ReHashPassword= await bcrypt.hash(req.body.Password,ReSalt);
    
    req.body.Password=ReHashPassword;

    console.log(req.body);

    db.collection("userdata").updateOne({_id:Number(req.body._id)},{$set:{Password:req.body.Password}},(error,data)=>{
        if(error){
            console.log(error)
        }
        res.json("updated")
    });
})
app.post("/register",async (req,res)=>{
  
    const Salt= await bcrypt.genSalt();

    const HashPassword= await bcrypt.hash(req.body.Password,Salt);
       
    req.body._id = new Date().getTime();

    req.body.Password=HashPassword;

    req.body.Role="User"

         db.collection("userdata").insert(req.body, (error, data)=>{

           if(error)
             {
            res.status(401).json("You have error in insert query");
              }
             else {
               
              res.json("User Registered Successfully");
            
             console.log(data);
             }
      }); 
        
});

app.post("/login", (req,res)=>{

    
    db.collection("userdata").find({EmailId:req.body.EmailId},{projection:{FirstName:1,Password:1,LastName:1,_id:1,Role:1}}).toArray((error,data)=>{
        if(error){
            res.status(400).json("Error in select query");
        }
        
        if(data.length==0 || data==null ){
        res.status(404).json("User Not Availale")
        }else{ 
            bcrypt.compare(req.body.Password,data[0].Password).then((response)=>{
                console.log(response)

            if(response==true){
                var token =jwt.sign(data[0],'mykey')
                delete data[0].Password;
                res.json(token)
            }else{
                res.status(401).json("invalid User")
            }
            });
        }
     })
   
});

var loggedUser;

function verifyToken(req, res, next)
{
    var token = req.headers.authkey;

    console.log(token);

    if(!token)
    {
        return res.status(401).json("No token found");
    }

    jwt.verify(token, 'mykey', (error, data)=>{

        if(error)
        {
            console.log(error);

            return res.status(401).json("Token Mismatch");
        }

        loggedUser = data;

        console.log(loggedUser);

    });
    
    next();
}

module.exports = app;
