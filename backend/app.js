const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');

const mongodb= require('mongodb').MongoClient;

const bcrypt= require('bcrypt');

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

app.post("/register",async (req,res)=>{
  
    const Salt= await bcrypt.genSalt();

    const HashPassword= await bcrypt.hash(req.body.Password,Salt);
       
    req.body._id = new Date().getTime();

    req.body.Password=HashPassword;

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
    
     db.collection("userdata").find(req.body,{projection:{_id:1,Userame:1}}).toArray((error,data)=>{
         
        if(error){
            res.status(400).json("Error in select query");
        }
        else{
            var token="";
            
            if(data.length >0 ){

                token =jwt.sign(data[0],'mykey');
            }

            res.json(token);
        }
         })
    
    // db.collection("userdata").find(req.body.EmailId).toArray((error,data)=>{
    //     if(error){
    //         res.status(400).json("Error in select query");
    //     }
    //     console.log(data)
        // if(data.length==0 || data.length==null ){
        // res.json("User Name Not Available")
        // }else{ 
        // if(error){
        //     res.status(400).json("Error in select query");
        // }
        //     bcrypt.compare(req.body.Password,data[0].Password).then((response)=>{
        //         console.log(response)

        //     if(response==true){
        //         var token =jwt.sign(data[0],'mykey')
        //         res.json(token)
        //     }else{
        //         res.json(null)
        //     }
        //     });
        // }
    //  })
   
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
