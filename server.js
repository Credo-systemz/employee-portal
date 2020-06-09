const http = require('http');


const app = require("./backend/app");

const server = http.createServer(app);
/* 
  const server = http.createServer((req,res)=>{
         res.end("Welcome to nodeJs");
 }); */


server.listen(3000,()=>{
    console.log("Server started on port number 3000");
});