const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');

const mongodb= require('mongodb').MongoClient;

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

app.post("/register",(req,res)=>{

    console.log(req.body);

    req.body._id = new Date().getTime();

    db.collection("userdata").insert(req.body, (error, data)=>{

        if(error)
        {
            res.status(401).json("You have error in insert query");
        }
        else {
            res.json("User Registered Successfully");
            console.log(data);
        }
    })

});


module.exports = app;
