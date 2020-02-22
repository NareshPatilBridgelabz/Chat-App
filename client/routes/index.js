const express = require('express');
const app = express();
const path = require('path');

// const express = require('express');
// const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.listen(5000,() => {
//     console.log('Client now on : 5000 PORT.');
// });
http.listen(5000,() => {
    console.log(`Port listening on : 5000.`);
})

//For default path.
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

io.sockets.on("connection",(socket) => {
    console.log(`A new client connected. `);
    console.log(socket.id);
    socket.on('sendmsg',(data) => {
        socket.broadcast.emit("updateHeader",data);
        // io.sockets.emit('updateHeader', data);
    })
})

