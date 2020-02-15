const express = require('express');
const app = express();
const path = require('path');

app.listen(5000,() => {
    console.log('Client now on : 5000 PORT.');
});

app.get("/",(request,response) => {
    response.sendFile(path.join(__dirname,'../components/dashboard.html'));
})

app.get("/dashboard",(request,response) => {
    response.sendFile(path.join(__dirname,'../components/dashboard.html'));
})

app.get("/login" ,(request,response) => {
    response.sendFile(path.join(__dirname,'../components/login.html'));
})

app.get("/registration",(request,response) => {
    response.sendFile(path.join(__dirname,'../components/registration.html'));
})

app.get("/forgotpassword",(request,response) => {
    response.sendFile(path.join(__dirname,'../components/forgotpassword.html'));
})

app.get("/resetpassword",(request,response) => {
    response.sendFile(path.join(__dirname,'../components/resetpassword.html'));
})

//services files
app.get('/services',function(req,res){
    res.sendFile(path.join(__dirname + '../services/user.services.js')); 
});