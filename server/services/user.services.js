const model = require('../models/user.model')
//export register function
exports.register = (request, callback) => {
    console.log("in services ", request.body);

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
exports.resetPassword = (request, callback) => {
    try {
        model.ResetPassword(request, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data)
        })
    } catch (e) {
        console.log(e);
    }
}
//GEt All user data.
exports.userData = (request, callback) => {
    try {
        model.userData(request, (err, data) => {
            if (err) {
                callback(err);
            } else
                callback(null, data)
        })
    } catch (e) {
        console.log(e);
    }
}
//Save Chat Services.
exports.saveChat = (request, callback) => {
    try {
        model.saveChat(request, (err, data) => {
            if (err) {
                console.log("service ERRO : "+ err);
                callback(err);
            } else{
                callback(null, data)
            }
        })
    } catch (e) {
        console.log(e);
    }
}
//Get Chat Services.
exports.getChat = (request, callback) => {
    try {
        model.getChat(request, (err, data) => {
            if (err) {
                console.log("service ERRO : "+ err);
                callback(err);
            } else{
                callback(null, data)
            }
        })
    } catch (e) {
        console.log(e);
    }
}