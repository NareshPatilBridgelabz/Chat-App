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
})
let register = mongoose.model("users", userData)

exports.Register  = (request, callback) => {
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
                                callback(err);
                            } else callback(null, data);
                        })
                    })
                } 
                console.log("model end")
            })
        }
        else {
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
                if (sucess)
                    callback(null, data);
                else
                    callback("Wrong Password");
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