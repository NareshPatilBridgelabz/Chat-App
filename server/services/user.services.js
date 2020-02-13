const model = require('../models/user.model')
//export register function
exports.register = (request, callback) => {
    try {
        model.Register(request, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    } catch (e) {
        console.log(e)
    }
}
//export login function
exports.login = (request, callback) => {
    try {
        model.Login(request, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data);
        })
    } catch (e) {
        console.log(e);
    }
}
//exports forgot password
exports.forgotpassword = (request, callback) => {
    try {
        model.forgotPassword(request, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    } catch (err) {
        console.log(err)
    }
}
//exports reset password
exports.resetPassword=(request,callback)=>{
    try{
    model.ResetPassword(request,(err,data)=>{
        if(err){
            callback(err);
        }else
        callback(null,data)
    })
} catch (e) {
    console.log(e);
}
}