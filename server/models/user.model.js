const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var emailExistence = require('email-existence')
const bcrypt = require('bcrypt');

const userData = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

let chatsData = new Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    chat:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});
let register = mongoose.model("users", userData)
let chats = mongoose.model("chats", chatsData);

exports.Register  = (request, callback) => {
    console.log("in model ",request.body);

    emailExistence.check(request.body.email, (err, result) => {
        if (result) {
            register.findOne({ "email": request.body.email }, (err, data) => {
                if (data) callback("Existing");
                else {
                    bcrypt.hash(request.body.password, 10, (err, encrypted) => {
                        var userDetails = new register({
                            "firstName": request.body.firstName,
                            "lastName": request.body.lastName,
                            "email": request.body.email,
                            "country": request.body.country,
                            "password": encrypted
                        })
                        userDetails.save((err, data) => {
                            if (err) {
                                console.log("err in save",err);
                                
                                callback(err);
                            } else 
                            {
                                console.log("dta",data);
                                
                                callback(null, data);
                            }
                        })
                    })
                } 
                console.log("model end")
            })
        }else {
            callback("email is invalid ")
        }
    })
}       
     
//exports login
exports.Login = (request, callback) => {
    register.findOne({
        "email": request.body.email
    }, (err, data) => {
        if (data) {
            //compare the password
            bcrypt.compare(request.body.password, data.password, (err, sucess) => {
                if (sucess){
                    let responce = {};
                    responce._id = data._id;
                    responce.firstName = data.firstName;
                    responce.email = data.email;
                    callback(null, responce);
                }
                else{
                    callback("Wrong Password");
                }
            })
        }
        else callback("email doesnot match or exist");
    })
}
//exports forgot password 
exports.forgotPassword = (request, callback) => {
    register.findOne({
        //checks the email in schema using findone
        "email": request.body.email
    }, (err, data) => {
        if (data) {
            callback(null, data)
        }
        else {
            callback("invalid user email ");
        }
    })
}
//exports reset password
exports.ResetPassword = (request, callback) => {
    bcrypt.hash(request.body.password, 10, (err, encrypted) => {
        register.updateOne(
           
            { "_id":request.decoded.payload }, {
                "password": encrypted
            }
            , (err, data) => {
                if (data)
                    callback(null, data);
                else
                    callback("error");
            })
    })
}
//Get All User Data.
exports.userData = (request, callback) => {

        register.find({'email' : {'$ne' : request.body.email}},{ _id: 1, firstName: 1, email: 1}, (err, data) => {
                if (data){
                    console.log(request.body);
                    callback(null, data);  
                }else{
                    callback("error");
                }
                   
            })
}
//Save The Chat
exports.saveChat = (request, callback) => {
    try{
        let chatNewData = new chats({
            "from" : request.body.from,
            "to" : request.body.to,
            "chat" : request.body.chat
        })
        chatNewData.save((err,data) => {
            if(err){
                console.log("service ERRO : "+ err);
                callback(err);
            } else {
                callback(null,data)
            }
        })
    }
    
}
//Get The Chat data
exports.getChat = (request, callback) => {
    chats.find({"$or": [{
        "from": request.body.from,"to":request.body.to
    }, {
        "from": request.body.to,"to":request.body.from
    }]},(err,data) => {
        if(err){
            callback(err);
        }else{
            callback(null,data);
        }
    })
}
