const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');

const mongodb= require('mongodb').MongoClient;

const bcrypt= require('bcrypt');
 
const nodemailer = require("nodemailer");

const { resolveSoa } = require('dns');

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
   
    db.collection("userdata").find({EmailId:forgetemail}).toArray((error,data)=>{  
        
        if(data.length!==0 || data==!null)
         {
             var myid=data[0]._id

             var jwttoken =jwt.sign({myid},'mykey',{expiresIn :'30m'} );
                
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
                'http://localhost:4200/resetpassword/'+jwttoken+
                '\n\n' + 
                'if you didnot make this request then you can safely ignore this email'+'\n'+
                'Thanks'+'\n'+
                'Team'
             }
               transporter.sendMail(mailoption,(error,res)=>{
               if(error)
               {
                 console.log(error);
                }
                else{
                    console.log(res);
            }
            
         });
          
            res.json(true);
          }
             else
           {
             res.status(404).json("EMail ID Not Availale");                
           }          
    });
});
//Reset Password //
app.put("/resetpassword",async (req,res)=>{

    const ReSalt= await bcrypt.genSalt();

    const ReHashPassword= await bcrypt.hash(req.body.Password,ReSalt);
    
    req.body.Password=ReHashPassword;
   
    const myUid=jwt.decode(req.body._id)   
   
   // console.log(myUid)
    console.log(Math.floor(Date.now() / 1000))

    if(Math.floor(Date.now() / 1000)>myUid.exp){

       res.status(408).json("Token Expired")
    }
    else
      {
        db.collection("userdata").updateOne({_id:myUid.myid},{$set:{Password:req.body.Password}},(error,data)=>{
        if(error){
            console.log(error)
        }
    
      });   
    
      res.json("success")

    }

});

app.post("/register", async (req,res)=>{
  
    const Salt= await bcrypt.genSalt();

    const HashPassword= await bcrypt.hash(req.body.Password,Salt);
       
    req.body._id = new Date().getTime();

    req.body.Password=HashPassword;

    req.body.Role="User"

    req.body.Status="Inactive"

         db.collection("userdata").insert(req.body, (error, data)=>{

           if(error)
             {
            res.status(401).json("You have error in insert query");
              }
             else {
               
            //   res.json("User Registered Successfully");
            
             console.log(req.body.EmailId);
             var myid=req.body._id;
             var jwttoken =jwt.sign({myid},'mykey',{expiresIn :'30m'} );
                
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
                to:req.body.EmailId,
                subject:"Email Verification",
                text:'Hi'+'\n'+
                'You are recently requested to register for your account.'+'\n'+
                'Click the Link below to complete registeration.'+'\n\n'+
                'http://localhost:4200/register/'+jwttoken+
                '\n\n' + 
                'if you didnot make this request then you can safely ignore this email'+'\n'+
                'Thanks'+'\n'+
                'Team'
             }
               transporter.sendMail(mailoption,(error,res)=>{
               if(error)
               {
                 console.log(error);
                }
                else{
                    console.log(res);
            }
            
         });
        //  res.json(jwttoken);
         res.json("User Registered Successfully");
             }
      }); 
          
});

app.post("/login", (req,res)=>{

    db.collection("userdata").find({EmailId:req.body.EmailId, Status:"Active"},{projection:{FirstName:1,Password:1,LastName:1,_id:1,Role:1}}).toArray((error,data)=>{
        if(error){
            res.status(400).json("Error in select query");
        }
        
        if(data.length==0 || data==null ){
             res.status(404).json("User Not Availale")
            }
        else{ 

              bcrypt.compare(req.body.Password,data[0].Password).then((response)=>
              {
               
                 if(response==true){

                 var token =jwt.sign(data[0],'mykey');
                
                 delete data[0].Password;
                
                 res.json(token);
                 }
                 else
                 {
                 res.status(401).json("invalid User")
                 }
              });
            }
     });
   
});

app.post('/userinfo', (req,res)=>{

    db.collection('userinfo').insert(req.body, (error,data)=>{
        
        if (error){
            res.status(400).json("Error in select query");
        }
        else{
               
                res.json("Information Saved");
              
               console.log(data);
        }

    })
})

// Email check
// app.get("/emailCheck/:emailid",(req,res)=>{
   
//     const emailCheck=req.params.emailid;
   
//     db.collection("userdata").find({EmailId:emailCheck}).toArray((error,data)=>{  
        
//         if(data.length!==0 || data==!null)
//         {
//         //     res.status(404).json("Ready to register");                
//         //   } 
//         //   else
//         //  {
//               var myid=data[0]._id;

//              var jwttoken =jwt.sign({myid},'mykey',{expiresIn :'30m'} );
                
//             const transporter = nodemailer.createTransport({
//                 host:"smtp.gmail.com",
//                 port:465,
//                 auth:{
//                     user:'projectemployeeportal@gmail.com',
//                     pass:'Empportal@5'
//                 }
//             })
//             var mailoption={
//                 from:process.env.EMAIL,
//                 to:req.params.emailid,
//                 subject:"Email Verification",
//                 text:'Hi'+'\n'+
//                 'You are recently requested to register for your account.'+'\n'+
//                 'Click the Link below to complete registeration.'+'\n\n'+
//                 'http://localhost:4200/register/'+jwttoken+
//                 '\n\n' + 
//                 'if you didnot make this request then you can safely ignore this email'+'\n'+
//                 'Thanks'+'\n'+
//                 'Team'
//              }
//                transporter.sendMail(mailoption,(error,res)=>{
//                if(error)
//                {
//                  console.log(error);
//                 }
//                 else{
//                     console.log(res);
//             }
            
//          });
          
//             res.json(jwttoken);
//          }
                  
                    
//     });
//  });

 
    app.put("/confirmEmail",async (req,res)=>{
        
        
        // console.log(req.body);
         const myUid=jwt.decode(req.body._id)   
       var data="Active";

      console.log(myUid)
    //     console.log(Math.floor(Date.now() / 1000))
    
        if(Math.floor(Date.now() / 1000)>myUid.exp){
    
           res.status(408).json("Token Expired")
        }
        else
          {
            db.collection("userdata").updateOne({_id:myUid.myid},{$set:{Status:data}},(error,data)=>{
            if(error){
                console.log(error)
            }
        
          });   
        
          res.json("success")
    
        }
    
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
